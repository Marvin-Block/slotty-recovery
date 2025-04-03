/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: false,
    poweredByHeader: false,
    images: {
        domains: [
            "cdn.slotty.cc",
            "slotty.cc",
            "cdn.discordapp.com",
            "cdn.discord.com",
            "i.imgur.com",
            "docs.slotty.cc",
            "cdn.trustpilot.net",
        ],
    },
    staticPageGenerationTimeout: 300,
    distDir: process.env.BUILD_DIR,
};
