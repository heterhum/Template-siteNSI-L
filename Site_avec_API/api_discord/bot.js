const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const express = require('express')
const http = require('http');
const app = express()
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 7000

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        ]
        });

const TOKEN = process.env.TOKEN;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
})

client.on('messageCreate', (msg) => {
    console.log(msg.content);
    io.on('connection', (socket) => {
        socket.emit('discord',msg.content)
    });

    if(msg.content === "ping"){
        msg.reply("pong!!!");
    }
})

client.login(TOKEN);
server.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`)
  });

// use node index.js to run the bot in the folder