module.exports = {
    apps: [{
        name: "slottyrecovery",
        max_restarts: 100,
        script: "node_modules/next/dist/bin/next",
        args: "start",
        // instances: "max",
        // exec_mode: "cluster",
        autorestart: true,
    }],
};