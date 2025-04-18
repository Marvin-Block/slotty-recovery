import axios from "axios";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import * as speakeasy from "speakeasy";
import { prisma } from "../../../../src/db";
import Email from "../../../../src/email";
import { getBrowser, getIPAddress, getPlatform, getXTrack } from "../../../../src/getIPAddress";
dotenv.config({ path: "../../" });


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

        let tokenExpiry: string = "30d";
        if (!data.username || !data.password) {
            return res.status(400).json({
                success: false,
                message: "Missing username or password"
            });
        }

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

        const isValid = await bcrypt.compare(data.password, account.password);
        if (!isValid) return res.status(400).json({
            message: "Some Credentials are incorrect"
        });

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

        const token = sign({
            id: account.id,
            time: Date.now()
        }, `${process.env.JWT_SECRET}`, {
            expiresIn: tokenExpiry
        });

        await prisma.sessions.deleteMany({
            where: {
                accountId: account.id,
                token: token
            }
        });

        await prisma.sessions.create({
            data: {
                accountId: account.id,
                token: token,
            },
        });

        await prisma.accounts.update({
            where: {
                id: account.id
            },
            data: {
                lastIp: getIPAddress(req),
            }
        });

        await prisma.logs.create({
            data: {
                type: 1,
                username: `${account.username} (${account.id})`,
                ipAddr: getIPAddress(req),
                device: JSON.stringify(xTrack)
            }
        });

        if ((account.lastIp ?? "") !== getIPAddress(req)) {
            await axios.get(`https://ipinfo.io/${getIPAddress(req)}/json?token=${process.env.IPINFO_TOKEN}`).then(async (res) => {
                await Email.send({
                    to: account.email,
                    from: {
                        email: "no-reply@slotty.cc",
                        name: "SlottyRecovery"
                    },
                    subject: "New Login Detected",
                    text: `Hello ${account.username},\n\nA new login was detected from ${res.data.city ?? "Unknown City"}, ${res.data.region ?? "Unknown Region"}, ${res.data.country ?? "Unknown Country"}.\n\nIf this was not you, please change your password immediately.\n\nRegards,\nSlottyRecovery`,
                    html: `
                        <!DOCTYPE html>
                        <html>
                            <head>
                                <title>SlottyRecovery</title>
                            </head>
                            <body>
                                <h1 style="text-align: center; margin-top: 1.5rem; line-height: 2rem; font-size: 2.25rem; font-weight: 600; margin-bottom: 1rem; color: rgb(79, 70, 229);">
                                    SlottyRecovery
                                </h1>
                                <div style="padding: 1rem; border-radius: 0.75rem; background: rgb(250, 250, 250);">
                                    <h2 style="color: rgb(0, 0, 0); font-size: 1.75rem; line-height: 2rem; font-weight: 600; line-height: 1.25; margin-bottom: 1rem">
                                        Login Detected
                                    </h2>
                                    <p style="white-space: pre-line; color: rgb(0, 0, 0); font-weight: 400; margin-bottom: 0.75rem; overflow-wrap: break-word; font-size: 1rem;">
                                        Hello ${account.username},
                                        <br />
                                        We have noticed that you have logged in from a new location.
                                        <b style="font-weight: 600">Location:</b> Near ${res.data.city ?? "Unknown"}, ${res.data.region ?? "Unknown"}, ${res.data.country ?? "Unknown"}
                                        <b style="font-weight: 600">Device:</b> ${getPlatform(req.headers["user-agent"] ?? "")} (${getBrowser(req.headers["user-agent"] ?? "")})
                                        <b style="font-weight: 600">IP:</b> ${getIPAddress(req)} <br />
                                        If this was not you, please change your password immediately.
                                    </p>
                                    <p style="white-space: pre-line; color: rgb(0, 0, 0); font-weight: 400; margin-bottom: 0.75rem; overflow-wrap: break-word; font-size: 1rem;">
                                        Regards,
                                        SlottyRecovery
                                    </p>
                                    <p style="white-space: pre-line; color: rgb(0, 0, 0); font-weight: 400; margin-bottom: 0.75rem; overflow-wrap: break-word; font-size: 1rem;">
                                        <small style="color: rgb(0, 0, 0); font-weight: 400; margin-bottom: 0.75rem; overflow-wrap: break-word; font-size: 0.75rem;">
                                            This email was sent to ${account.email} because you have an account on SlottyRecovery. If you did not create an account, please ignore this email or <a href="mailto:contact@slotty.cc">contact us</a>.
                                        </small>
                                    </p>
                                </div>
                            </body>
                        </html>
                    `,
                }).then((res: any) => {
                    console.log(`[EMAIL] [${new Date().toLocaleString()}] Sent email to ${account.email} for new login`);
                }).catch((err: any) => {
                    console.error(err);
                })
            });
        }

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