import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import * as speakeasy from "speakeasy";
import { prisma } from "../../../../src/db";
import { getIPAddress, getXTrack } from "../../../../src/getIPAddress";
dotenv.config({ path: "../../" });


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log( `[API] [${new Date().toLocaleString()}] [${req.method}] ${req.url} ${JSON.stringify(req.body)}`);
    if (req.method !== "POST")
        return res.status(405).json({
            message: "Method not allowed"
        });

    try {
        const data = {
            ...req.body
        };
        const xTrack = getXTrack(req);
        if (!xTrack) return res.status(400).json({
            success: false,
            message: "Invalid Request"
        });
        console.log("[API] [X-Track] ", xTrack);
        let tokenExpiry: string = "30d";
        if (!data.username || !data.password) {
            return res.status(400).json({
                success: false,
                message: "Missing username or password"
            });
        }
        console.log("[API] [Login] ", data.username);

        if (!data) return res.status(400).json({
            message: "Please provide all fields"
        });

        const account = await prisma.accounts.findFirst({
            where: {
                username: data.username.toLowerCase()
            }
        });
        if (!account) return res.status(400).json({
            process,
            message: "Account not found"
        });
        console.log("[API] [Login] [Account] ", account);

        const isValid = await bcrypt.compare(data.password, account.password);
        if (!isValid) return res.status(400).json({
            message: "Some Credentials are incorrect"
        });
        console.log("[API] [Login] [Password] ", isValid);

        if ((account.twoFactor !== 0 && account.googleAuthCode) && !data.totp) return res.status(400).json({
            message: "2FA Code Required"
        });

        if (account.twoFactor !== 0 && account.googleAuthCode) {
            const totpVerify = speakeasy.totp.verify({
                secret: account.googleAuthCode,
                encoding: "base32",
                token: data.totp
            });

            if (!totpVerify) return res.status(400).json({
                message: "Invalid 2FA Code"
            });

            tokenExpiry = "90d";
        }

        if (account.banned) return res.status(400).json({
            message: "Account is Banned. Contact: admin@slotty.cc"
        });
        console.log("[API] [Login] [Banned] ", account.banned);

        const token = sign({
            id: account.id,
            time: Date.now()
        }, `${process.env.JWT_SECRET}`, {
            expiresIn: tokenExpiry
        });

        console.log("[API] [Login] [Token] ", token);

        await prisma.sessions.deleteMany({
            where: {
                accountId: account.id,
                token: token
            }
        });

        console.log("[API] [Login] [Delete Session] ", account.id);

        await prisma.sessions.create({
            data: {
                accountId: account.id,
                token: token,
            },
        });

        console.log("[API] [Login] [Create Session] ", account.id);

        await prisma.accounts.update({
            where: {
                id: account.id
            },
            data: {
                lastIp: getIPAddress(req),
            }
        });

        console.log("[API] [Login] [Update Account] ", account.id);

        prisma.logs.create({
            data: {
                type: 1,
                username: `${account.username} (${account.id})`,
                ipAddr: getIPAddress(req),
                device: JSON.stringify(xTrack)
            }
        });
        console.log("[API] [Login] [Create Log] ", account.id);

        console.log("[API] [Login] [Success] ", account.id);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            process: censor(process)
        });
    } catch (err: any) {
        console.error(err);
        if (err?.name === "ValidationError") return res.status(400).json({
            success: false,
            message: err.errors[0]
        });
        return res.status(500);
    }
}

function censor(censor:any) {
    var i = 0;
    
    return function(key:any, value:any) {
        if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
            return '[Circular]'; 
      
        if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
            return '[Unknown]';
      
        ++i; // so we know we aren't using the original object anymore
      
        return value;  
    }
}