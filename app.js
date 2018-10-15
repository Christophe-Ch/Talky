// Discord
const Discord = require('discord.js');
const client = new Discord.Client();

// Configuration
const conf = require('./conf/conf.json');

client.on("message", () => {
    
});

client.login(conf.token);