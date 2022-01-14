const express = require("express");
const server = express();
server.use(express.json());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const projectRouter = require("../api/projects/projects-router");
server.use("/api/projects", projectRouter);

const actionRouter = require("./actions/actions-router");
server.use("/api/actions", actionRouter);

module.exports = server;
