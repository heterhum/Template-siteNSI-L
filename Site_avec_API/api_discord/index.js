const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 5500;
const TOKEN = process.env.TOKEN;


const client = new Client({
  intents:[
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.MessageContent,
      ]
});


// Genere page html de l'acceuil + css + js +img ect ...
app.get('/', async(req, res) => {
  res.sendFile("C:/Users/xoxar/Desktop/perso/code/Template-siteNSI/Site_avec_API/public/main.html")
});
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  next();
});
app.use(express.static('./Site_avec_API/public'));

// Gestion des messages
var message=  "";
client.on('messageCreate', (msg) => {
  console.log(msg.content);
  message = msg.content;
  io.emit("discord", message);
  });
io.on ('connection', (socket) => {
  console.log('a user connected');
});


//démmarage !
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});
client.login(TOKEN);
server.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`)
});
