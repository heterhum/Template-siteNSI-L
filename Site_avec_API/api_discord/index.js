const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config()
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
    if(msg.content === "ping"){
        msg.reply("pong!!!");
    }
})

client.login(TOKEN);

// use node index.js to run the bot in the folder