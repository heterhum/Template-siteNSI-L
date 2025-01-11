const { Client, GatewayIntentBits} = require('discord.js');
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 5500;
const TOKEN = process.env.TOKEN;
var guild ="";
app.use(cookieParser());
const numbergen=17;
const stringselec = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const client = new Client({
  intents:[
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.MessageContent,
      //GatewayIntentBits.Guild,
      ]
});

var userlist={};
// Fonction pour générer un nombre aléatoire
function getRandomInt(max) {
  var l = ""
  for (var i = 0; i < max; i++) {
    l += stringselec[Math.floor(Math.random() * max)];
  }
  return l;
}

// Genere page html de l'acceuil + css + js +img ect ...
app.get('/', async(req, res) => {
  res.sendFile("C:/Users/xoxar/Desktop/perso/code/Template-siteNSI/Site_avec_API/public/main.html")
  
});
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  next();
});
app.use(express.static('./Site_avec_API/public'));
//-------------------------------------
app.get('/chat', async(req, res) => {
  console.log(req.cookies);
  if (req.cookies.caca in userlist){
    res.sendFile("C:/Users/xoxar/Desktop/perso/code/Template-siteNSI/Site_avec_API/public/chat.html")
  } else {
    res.redirect('/');
  };
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
  user=msg.author.username;
  io.emit("discord", {"message":message,"user":user});
  });

io.on ('connection', (socket) => {
  console.log('a user connected');
  socket.on("usermessage",(msg) =>{
    const channel = client.channels.cache.get('1085275930831888446');
    console.log(msg.username,":",msg.usermsg);
    channel.send( "from : " + msg.username+"\n"+msg.usermsg);
  });
  socket.on('Nameforid',msg=>{
    console.log('namereçue')
    var cookieuser= getRandomInt(numbergen);
    io.emit("cookie",cookieuser);
    var username = msg;
    userlist[cookieuser]=username;
    console.log(userlist);
  });
});

//démmarage !
//TO DO
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  guild=client.guilds.cache.get("1085275930022400082");
  channel=guild.channels;
  //console.log(channel);

});
client.login(TOKEN);
server.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`)
});
