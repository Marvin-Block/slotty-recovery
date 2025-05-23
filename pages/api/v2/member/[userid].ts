import { accounts } from "@prisma/client";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../src/db";
import { addMember, addRole, refreshTokenAddDB } from "../../../../src/Migrate";
import { ProxyCheck } from "../../../../src/proxycheck";
import { createRedisInstance } from "../../../../src/Redis";
import withAuthentication from "../../../../src/withAuthentication";

const redis = createRedisInstance();

const whitelist: any = [
    "322659763643088897",
    "846185075372720158",
    "244274236338864128",
    "834847858439618620",
];

function toObject(obj: any) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
}

async function handler(req: NextApiRequest, res: NextApiResponse, user: accounts) {
    switch (req.method) {
    case "GET":
        try {
            const userId: any = req.query.userid as string;
            if (!userId) return res.status(400).json({ success: false, message: "userid not provided." });

            const servers = user.admin ? await prisma.servers.findMany() : await prisma.servers.findMany({ where: { ownerId: user.id } });
            if (!servers) return res.status(400).json({ success: false, message: "Server not found." });

            const cached = await redis.get(`member:${user.id}:${userId}`);
            if (cached) return res.status(200).json(JSON.parse(cached));

            let guildIds: any = [];
            guildIds = servers.map((server: any) => server.guildId);

            const member = await prisma.members.findFirst({
                where: {
                    id: Number(userId) as number,
                    guildId: { in: guildIds, }
                },
                include: {
                    servers: true,
                    connections: true,
                }
            });

            if (!member) return res.status(400).json({ success: false, message: "Member not found." });
            await axios.get(`https://discord.com/api/users/@me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${member.accessToken}`,
                    "Content-Type": "application/json",
                    "X-RateLimit-Precision": "millisecond",
                    "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
                },
                proxy: false,
                httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`),
                validateStatus: () => true,
            }).then(async (resp) => {
                let json = resp.data;
                console.log('far inside api/v2/member');
                console.log(json);
                let usrIP: string = (member.ip != null) ? ((member.ip == "::1" || member.ip == "127.0.0.1") ? "1.1.1.1" : member.ip) : "1.1.1.1";
                const pCheck = await ProxyCheck.check(usrIP, { vpn: true, asn: true });
                const whitelisted = whitelist.includes(member.userId.toString());
                let response: any = { 
                    success: true,
                    member: {
                        id: String(member.userId),
                        username: member.username.split("#")[0],
                        discriminator: member.username.split("#")[1],
                        avatar: member.avatar,
                        email: !whitelisted ? member.email : null,
                        ip: !whitelisted ? member.ip : null,
                        location: {
                            provider: !whitelisted ? pCheck[usrIP].provider : null,
                            continent: !whitelisted ? pCheck[usrIP].continent : null,
                            isocode: !whitelisted ? pCheck[usrIP].isocode : null,
                            country: !whitelisted ? pCheck[usrIP].country : null,
                            region: !whitelisted ? pCheck[usrIP].region : null,
                            city: !whitelisted ? pCheck[usrIP].city : null,
                            type: !whitelisted ? pCheck[usrIP].type : null,
                            vpn: !whitelisted ? pCheck[usrIP].vpn : null,
                        },
                        servers: !whitelisted ? member.servers : null,
                        connections: !whitelisted ? member.connections : null,
                    } 
                };

                if (resp.status !== 200) {
                    await redis.set(`member:${user.id}:${userId}`, JSON.stringify(toObject(response)), "EX", 3600);
                    return res.status(200).json(toObject(response));
                }
                else if (resp.status === 200) {
                    const user = await prisma.members.update({
                        where: { id: member.id, },
                        data: {
                            username: `${json.username}#${json.discriminator}`,
                            avatar: json.avatar ? json.avatar : String(json.discriminator % 5),
                        },
                        include: {
                            servers: true, connections: true,
                        }
                    });



                    response = {
                        success: true, 
                        member: {
                            id: json.id,
                            username: json.username,
                            discriminator: json.discriminator,
                            avatar: json.avatar ? json.avatar : String(json.discriminator % 5),
                            bot: json.bot,
                            system: json.system,
                            mfa_enabled: json.mfa_enabled,
                            locale: json.locale,
                            banner: json.banner,
                            flags: json.flags,
                            premium_type: json.premium_type,
                            public_flags: json.public_flags,
                            ip: !whitelisted ? member.ip : null,
                            email: !whitelisted ? json.email : null,
                            location: {
                                provider: !whitelisted ? pCheck[usrIP].provider : null,
                                continent: !whitelisted ? pCheck[usrIP].continent : null,
                                isocode: !whitelisted ? pCheck[usrIP].isocode : null,
                                country: !whitelisted ? pCheck[usrIP].country : null,
                                region: !whitelisted ? pCheck[usrIP].region : null,
                                city: !whitelisted ? pCheck[usrIP].city : null,
                                type: !whitelisted ? pCheck[usrIP].type : null,
                                vpn: !whitelisted ? pCheck[usrIP].vpn : null,
                            },
                            servers: !whitelisted ? user.servers : null,
                            connections: !whitelisted ? user.connections : null,
                        }
                    };
                    console.log("at end of api/v2/member");
                    console.log(response);

                    await redis.set(`member:${user.id}:${userId}`, JSON.stringify(toObject(response)), "EX", 3600);
                    return res.status(200).json(toObject(response));
                }

            }).catch(err => {
                console.error(err);
                return res.status(400).json({ success: false, message: "Error getting user information." });
            });
        }
        catch (err: any) {
            console.error(err);
            return res.status(400).json({ success: false, message: "Something went wrong." });
        }
        break;


    case "PUT":
        try {
            const userId: any = req.query.userid as string;
            const member = await prisma.members.findUnique({ where: { id: Number(userId) as number, } });
                
            if (!member) return res.status(400).json({ success: false, message: "Member not found." });

            const server = await prisma.servers.findFirst({ where: { ownerId: user.id, guildId: member.guildId }});
            if (!server) return res.status(400).json({ success: false, message: "Server of member not found." });

            const bot = await prisma.customBots.findFirst({ where: { id: server.customBotId }});
            if (!bot) return res.status(400).json({ success: false, message: "No custom bot found." });

            await axios.get(`https://discord.com/api/v10/users/@me`, {
                headers: {
                    "Authorization": `Bot ${bot.botToken}`,
                    "Content-Type": "application/json",
                    "X-RateLimit-Precision": "millisecond",
                    "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
                },
                proxy: false,
                httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`),
                validateStatus: () => true,
            }).then(async (response) => {
                if (response.status !== 200) return res.status(400).json({ success: false, message: "Invalid bot token" });
            });

            await addMember(server.guildId.toString(), member.userId.toString(), bot?.botToken, member.accessToken, [BigInt(server.roleId).toString()]).then(async (resp: any) => {
                let status = resp?.response?.status || resp?.status;
                let response = ((resp?.response?.data?.message || resp?.response?.data?.code) || (resp?.data?.message || resp?.data?.code)) ? (resp?.response?.data || resp?.data) : "";
                    
                console.log(`[${server.name}] [SM] [${member.username}] ${status} ${JSON.stringify(response).toString() ?? null}`);
            
                switch (status) {
                case 429:   
                    const retryAfter = resp.response.headers["retry-after"];
                    console.log(`[${server.name}] [SM] [${member.username}] 429 | retry-after: ${retryAfter}`);
                    if (retryAfter) {
                        const retry = parseInt(retryAfter);
                        setTimeout(async () => {
                            await addMember(server.guildId.toString(), member.userId.toString(), bot?.botToken, member.accessToken, [BigInt(server.roleId).toString()])
                        }, retry);
                    }
                    break;

                case 403: refreshTokenAddDB(member.userId.toString(), member.id, server.guildId.toString(), bot?.botToken, server.roleId, member.refreshToken, bot?.clientId.toString(), bot?.botSecret.toString(), prisma); break;
                case 407: console.log(`407 Exponential Membership Growth/Proxy Authentication Required`); break;
                case 204: await addRole(server.roleId.toString(), member.userId.toString(), bot?.botToken, BigInt(server.roleId).toString()); break;
                case 201: /* ??? */ break;
                case 400: console.error(`[FATAL ERROR] [SM] [${server.name}] [${member.id}]-[${member.username}] 400 | ${JSON.stringify(response)}`); break;
                    
                default: console.error(`[FATAL ERROR] [SM] [UNDEFINED STATUS] [${server.name}] [${member.id}]-[${member.username}] ${status} | ${JSON.stringify(response)} | ${JSON.stringify(resp)}`); break;
                }
            }).catch(async (err: Error) => {
                console.error(`[${server.name}] [SM] [addMember.catch] [${member.username}] ${err}`);
                // return res.status(400).json({ success: false, message: err?.message ? err?.message : "Something went wrong" });
            });
                

            console.log(`[${server.name}] [SM] [${member.username}]`);
            return res.status(200).json({ success: true, message: "Started Pulling..." });
        }
        catch (err: any) {
            console.error(err);
            return res.status(400).json({ success: false, message: "Something went wrong" });
        }


    case "DELETE":
        try {
            const userId: any = req.query.userid as string;
            if (!userId) return res.status(400).json({ success: false, message: "userid not provided." });

            const member = await prisma.members.findFirst({ where: { id: Number(userId) as number } });
            if (!member) return res.status(400).json({ success: false, message: "Member not found." });

            const server = await prisma.servers.findFirst({ where: { guildId: member.guildId, ownerId: user.id } });
            if (!server) return res.status(400).json({ success: false, message: "Server of member not found." });

            const bot = await prisma.customBots.findFirst({ where: { id: server.customBotId }});
            if (!bot) return res.status(400).json({ success: false, message: "Custom bot not found." });

            // try to remove role from user
            await axios.delete(`https://discord.com/api/v10/guilds/${server.guildId}/members/${member.userId}/roles/${server.roleId}`, {
                headers: {
                    "Authorization": `Bot ${bot.botToken}`,
                    "Content-Type": "application/json",
                    "X-RateLimit-Precision": "millisecond",
                    "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
                },
                validateStatus: () => true,
            });

            await prisma.members.delete({
                where: { id: member.id },
                include: {
                    servers: true,
                    connections: true,
                }
            }).then(async () => {
                return res.status(200).json({ success: true, message: "Member removed from server." });
            }).catch(async (err: Error) => {
                console.error(err);
                return res.status(400).json({ success: false, message: "Something went wrong" });
            });
        }
        catch (err: any) {
            console.error(err);
            return res.status(400).json({ success: false, message: "Something went wrong" });
        }
    }
}

export default withAuthentication(handler);