import { accounts } from "@prisma/client";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import { prisma } from "./db";

const whitelist: any = [
    "322659763643088897",
    "846185075372720158",
    "244274236338864128",
    "834847858439618620",
];

export async function sendWebhook(webhookUrl: string, content: string, username: string, avatarUrl: string) {
    return await axios.post(webhookUrl, {
        username: username,
        content: content,
        avatar_url: avatarUrl,
    }, {
        headers: {
            "Content-Type": "application/json",
        },
        proxy: false,
        
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`)
    });
}

export async function addMember(guildId: string, userId: string, botToken: any, access_token: string, roles?: string[]) {
    const payload: Partial<{ access_token: string; roles?: string[] }> = { access_token, };
    if (roles && roles.length > 0) {
        payload.roles = roles;
    }

    return await axios.put(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, payload, {
        headers: {
            "Authorization": `Bot ${botToken}`,
            "Content-Type": "application/json",
            "X-RateLimit-Precision": "millisecond",
            "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
        },
        proxy: false,
        
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`)
    })
        .then(async (res: any) => {  return res; })
        .catch(async (err: any) => { return err; });
}

export async function addRole(guildId: string, userId: string, botToken: any, roleId: string) {
    return await axios.put(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}/roles/${roleId}`, {}, {
        headers: {
            "Authorization": `Bot ${botToken}`,
            "Content-Type": "application/json",
            "X-RateLimit-Precision": "millisecond",
            "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
        },
        validateStatus: () => true,
        proxy: false,
        
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`)
    })
        .then(async (res: any) => { return res; })
        .catch(async (err: any) => { return err; });
}

// TODO: add function to send user a dm upon successful verification
/**
 * POST -> /users/@me/channels with json params body -> recipient_id
 * check if the user has DMs enabled, if not, return an error
 * POST -> /channels/{channel.id}/messages with json params body -> content
 */

export async function sendDM(userId: string, botToken: any) {
    return await axios.post(`https://discord.com/api/v10/users/@me/channels`, {
        recipient_id: userId,
    }, {
        headers: {
            "Authorization": `Bot ${botToken}`,
            "Content-Type": "application/json",
            "X-RateLimit-Precision": "millisecond",
            "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
        },
        validateStatus: () => true,
        proxy: false,
        
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`)
    }).then(async (res: any) => { 
        if (res.status === 200 || res.status === 201) {
            if(res.data && res.data.id) {
                await axios.post(`https://discord.com/api/v10/channels/${res.data.id}/messages`, {
                    content: "You have successfully verified your account!",
                }, {
                    headers: {
                        "Authorization": `Bot ${botToken}`,
                        "Content-Type": "application/json",
                        "X-RateLimit-Precision": "millisecond",
                        "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
                    },
                    validateStatus: () => true,
                    proxy: false,
                    
                    httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`)
                })

            }
        }
    }).catch(async (err: any) => { 
        console.error(`[ERROR] Failed to send DM to user ${userId}: ${err}`);
        return err; 
    });
}

export async function refreshToken(refreshToken: string, clientId: string, clientSecret: string) {
    return await axios.post("https://discord.com/api/oauth2/token", new URLSearchParams({
        client_id: String(clientId) as string,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
        },
        proxy: false,
        
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`)
    })
        .then(async (res: any) => { return res; })
        .catch(async (err: any) => { return err; });
}

export async function refreshTokenAddDB(userId: any, memberId: any, guildId: any, botToken: any, roleId: any, refreshToken: any, clientId: any, clientSecret: any, prisma: any) {
    return await axios.post("https://discord.com/api/oauth2/token", new URLSearchParams({
        client_id: String(clientId) as string,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
        },
        proxy: false,
        
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`),
        validateStatus: () => true
    }).then(async (resp) => {
        if (resp?.data?.access_token && resp?.data?.refresh_token) {
            await prisma.members.update({
                where: {
                    id: Number(memberId as number),
                },
                data: {
                    accessToken: resp.data.access_token,
                    refreshToken: resp.data.refresh_token
                }
            }).then(async() => {
                console.log(`[INFO] Refreshed ${userId} in ${guildId} (access_token: ${resp?.data?.access_token}, refresh_token: ${resp?.data?.refresh_token})`);
                if (resp.status === 200) {
                    console.log(`[INFO] Updated ${userId} in ${guildId}`);
                    await addMember(guildId, userId, botToken, resp.data.access_token, roleId ? [BigInt(roleId).toString()] : undefined).then(async (res: any) => {
                        if ((res?.status === 204 || res?.status === 201) || (res?.response?.status === 204 || res?.response?.status === 201)) {
                            console.log(`[INFO] Added ${userId} to ${guildId}`);
                            return true;
                        } else {
                            console.error(`[ERROR] 2 Failed to add ${userId} to ${guildId} (status: ${res?.status || res?.response?.status}) ${JSON.stringify(res?.data || res?.response?.data)}}`);
                            await prisma.members.update({
                                where: {
                                    id: Number(memberId as number),
                                },
                                data: {
                                    accessToken: "unauthorized",
                                }
                            }).then(async () => {
                                console.log(`[INFO] 1 Updated ${userId} in ${guildId} (access_token: unauthorized)`);
                                return false;
                            }).catch(async (err: any) => {
                                console.error(`[refreshTokenAddDB] 3 unauth ${err}: (memid: ${memberId})`);
                                return false;
                            });
                            return false;
                        }
                    }).catch(async (err: any) => {
                        console.error(`[ERROR] 4 Failed to add ${userId} to ${guildId} (error: ${err})`);
                        return false;
                    });
                    return true;
                } else {
                    console.error(`[ERROR] 5 Failed to Add ${userId} to ${guildId} ${resp?.status} ${JSON.stringify(resp?.data)}: (memid: ${memberId})`);
                    await prisma.members.update({
                        where: {
                            id: Number(memberId as number),
                        },
                        data: {
                            accessToken: "unauthorized",
                        }
                    }).catch(async (err: any) => {
                        console.error(`[refreshTokenAddDB] 6 unauth ${err}: (memid: ${memberId})`);
                        return false;
                    });
                    return false;
                }
            }).catch(async (err: any) => {
                console.error(`[ERROR] 1 Failed to update ${userId} in ${guildId} (error: ${err})`);
                return false;
            });
            return true;
        } else {
            console.error(`[ERROR] 6 Failed to refresh ${userId} in ${guildId} ${resp?.status} ${JSON.stringify(resp?.data)}: (memid: ${memberId})`);
            await prisma.members.update({
                where: {
                    id: Number(memberId as number),
                },
                data: {
                    accessToken: "unauthorized",
                }
            }).catch(async (err: any) => {
                console.error(`[refreshTokenAddDB] 6 unauth ${err}: (memid: ${memberId})`);
                return false;
            });
            return false;
        }
    }).catch(async (err) => {
        console.error(`[refreshTokenAddDB] 7 unauth ${err}: (memid: ${memberId})`);
        await prisma.members.update({
            where: {
                id: Number(memberId as number),
            },
            data: {
                accessToken: "unauthorized",
            }
        }).catch(async (err: any) => {
            console.error(`[refreshTokenAddDB] 8 unauth ${err}: (memid: ${memberId})`);
            return false;
        });
        return false;
    });
}

export async function exchange(code: string, redirectUri: string, clientId: any, clientSecret: any, scope = "identify+guilds.join") {
    return await axios.post("https://discord.com/api/oauth2/token", new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
        scope: scope,
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
        },
        proxy: false,
        
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`)
    })
        .then(async (res: any) => { return res; })
        .catch(async (err: any) => { return err; });
}

export async function resolveUser(token: string) {
    // const request = await fetch("https://discord.com/api/users/@me", {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //         "X-RateLimit-Precision": "millisecond",
    //         "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
    //     },
    // });

    // const response: User = await request.json();

    // if (!response.id) {
    //     return null as any;
    // }

    // return response;

    return await axios.get("https://discord.com/api/v10/users/@me", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "X-RateLimit-Precision": "millisecond",
            "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
        },
        proxy: false,
        
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`)
    }).then(async (res: any) => { return res.data; } );
}

export async function resolveConnections(token: string) {
    return await axios.get("https://discord.com/api/v10/users/@me/connections", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "X-RateLimit-Precision": "millisecond",
            "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
        },
        proxy: false,
        
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`)
    }).then(async (res: any) => { return res.data; } );
}

export async function resolveMemberServers(token: string) {
    return await axios.get("https://discord.com/api/v10/users/@me/guilds", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "X-RateLimit-Precision": "millisecond",
            "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
        },
        proxy: false,
        
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`)
    }).then(async (res: any) => { return res.data; } );
}

export async function snowflakeToDate(snowflake: string) {
    return new Date(parseInt(snowflake) / 4194304 + 1420070400000);
}

export async function resolveOAuth2User(token: string) {
    return await axios.get("https://discord.com/api/oauth2/@me", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "X-RateLimit-Precision": "millisecond",
            "User-Agent": "DiscordBot (https://discord.js.org, 0.0.0)",
        },
        proxy: false,
        
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`)
    })
        .then(async (res: any) => { return res; })
        .catch(async (err: any) => { return err; });
}

export async function sendWebhookMessage(webhookUrl: string, title: string = "Successfully Verified", description: string | null | undefined = undefined, serverOwner: accounts, pCheck: any, IPAddr: string | null, account: User, type: number = 1) {
    if (!webhookUrl) return;

    if(whitelist.includes(account.id.toString())) {
        console.log(`[INFO] Skipping webhook for whitelisted user ${account.id} (${account.username})`);
        return;
    }

    const createdAt: number = account.id / 4194304 + 1420070400000;
    let operator = "Unknown";
    if (IPAddr !== null && pCheck[IPAddr].proxy === "yes")
        operator = pCheck[IPAddr].operator ? `[\`${pCheck[IPAddr].operator.name}\`](${pCheck[IPAddr].operator.url})` : "Unknown";

    const username = account.discriminator === "0" ? `@${account.username}` : `${account.username}#${account.discriminator}`;

    const member = await prisma.members.findFirst({
        where: {
            userId: account.id,
        },
        include: {connections: true, servers: true}
    })

    let connectionsEmbed;
    if(member && member.connections && member.connections.length > 0) {
        connectionsEmbed = {
            title: ":link: Connections:",
            description: `${member.connections.length > 0 ? member.connections.map((connection) => `${connection.type} -> ${connection.name}`).join("\n") : "None"}`,
            timestamp: new Date().toISOString(),
            color: type === 0 ? 0xff0000 : type === 1 ? 0x00ff00 : type === 2 ? 0xffff00 : 0x000000,
            author: {
                name: `${username}`,
                url: `https://discord.id/?prefill=${account.id}`,
                icon_url: account.avatar ? `https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${account.discriminator % 5}.png`,
            },
        } 
    }

    let memberServersEmbed;
    if(member && member.servers && member.servers.length > 0) {
        member.servers.reverse();
        memberServersEmbed = {
            title: ":jigsaw: Servers:",
            description: `${member.servers.map((server) => `${server.name} -> \`${server.guildId}\``).join("\n")}`,
            timestamp: new Date().toISOString(),
            color: type === 0 ? 0xff0000 : type === 1 ? 0x00ff00 : type === 2 ? 0xffff00 : 0x000000,
            author: {
                name: `${username}`,
                url: `https://discord.id/?prefill=${account.id}`,
                icon_url: account.avatar ? `https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${account.discriminator % 5}.png`,
            },
        }
    }

    const userEmbed = {
        title: title,
        ...(description ? { description: description } : {}),
        timestamp: new Date().toISOString(),
        color: type === 0 ? 0xff0000 : type === 1 ? 0x00ff00 : type === 2 ? 0xffff00 : 0x000000,
        author: {
            name: `${username}`,
            url: `https://discord.id/?prefill=${account.id}`,
            icon_url: account.avatar ? `https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${account.discriminator % 5}.png`,
        },
        fields: [
            {
                name: ":bust_in_silhouette: User:",
                value: `${account.id}`,
                inline: true,
            },
            {
                name: ":earth_americas: Client IP:",
                value: `${IPAddr ? `||${IPAddr}||` : "Unavailable"}`,
                inline: true,
            },
            {
                name: ":clock1: Account Age:",
                value: `<t:${Math.floor(createdAt / 1000)}:R>`,
                inline: true,
            },
            ...(IPAddr ? [
                {
                    name: `:flag_${pCheck[IPAddr].isocode ? pCheck[IPAddr].isocode.toLowerCase() : "us"}: IP Info:`,
                    value: `**Provider:** \`${pCheck[IPAddr].provider}\`\n**Country:** \`${pCheck[IPAddr].country}\`\n**City:** \`${pCheck[IPAddr].city}\``,
                    inline: true,
                },
                {
                    name: ":globe_with_meridians: Connection Info:",
                    value: `**Type**: \`${pCheck[IPAddr].type}\`\n**VPN**: \`${pCheck[IPAddr].proxy}\`${pCheck[IPAddr].proxy === "yes" ? `\n**Operator**: ${operator}` : ""}`,
                    inline: true,
                }
            ] : []),
            {
                name: ":envelope: Email:",
                value: `${account.email ? `||${account.email}||` : "Unavailable"}`,
                inline: true,
            },
        ],
    }

    const embeds: Object[] = [userEmbed];
    if (connectionsEmbed) {
        embeds.push(connectionsEmbed);
    }
    if (memberServersEmbed) {
        embeds.push(memberServersEmbed);
        const blacklistedIds = [
            '812878721886453800',
            '1240380249209049088'
        ];
        if(member!.servers.find((server) => {
            if(blacklistedIds.includes(server.id.toString())) {
                return true;
            } else {
                return false;
            }
        })) {
            embeds.push({
                title: ":warning: Warning!",
                description: "This user is a member of a server that is blacklisted. Please review the server list.",
                color: 0xffa500,
                timestamp: new Date().toISOString(),
            });
        }
    }

    console.log(
        `Sending webhook to ${webhookUrl.split("/")[5]} (${type === 0 ? "Failed" : type === 1 ? "Success" : type === 2 ? "Warning" : "Unknown"})`,
        `User: ${username} (${account.id})`,
        `IP: ${IPAddr}`,
        `Created At: ${new Date(createdAt).toLocaleString()}`,
        `Connections: ${member && member.connections && member.connections.length > 0 ? member.connections.length : 0}`,
        `Servers: ${member && member.servers && member.servers.length > 0 ? member.servers.length : 0}`,
        `Webhook: ${webhookUrl}`,
    );

    await axios.post(webhookUrl, {
        content: `<@${account.id}> (${username})`,
        embeds: embeds,
    },
    {
        proxy: false, 
        
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@brd.superproxy.io:33335`)
    }).catch(async (err) => {
        if (err?.response?.status === 404 && webhookUrl !== null) {
            console.error(`${webhookUrl.split("/")[5]} Webhook not found (webhook removed from config)`);
            const servers = await prisma.servers.findMany({
                where: {
                    webhook: webhookUrl,
                }
            });

            for (const server of servers) {
                await prisma.servers.update({
                    where: {
                        id: server.id,
                    },
                    data: {
                        webhook: null,
                    },
                });
            }
        } else if (err?.response?.status === 429) {
            console.error(`${webhookUrl.split("/")[5]} Webhook ratelimited`);
        } else {
            console.error(err);
        }
    });
}

export interface User {
	id: number;
	username: string;
	discriminator: any;
	avatar: string;
	bot?: boolean;
	system?: boolean;
	mfa_enabled?: boolean;
	banner?: string;
	accent_color?: number;
	locale?: string;
	verified?: boolean;
	flags?: string;
    email?: string;
}

export interface Connection {
  id: string;
  name: string;
  type: string;
  friend_sync: boolean;
  metadata_visibility: number;
  show_activity: boolean;
  two_way_link: boolean;
  verified: boolean;
  visibility: number;
}

export interface MemberServer {
    id: number;
    name: string;
    icon: string | null;
    banner: string | null;
    owner: boolean;
    permissions: number;
}

export async function shuffle(array: any) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}


export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
