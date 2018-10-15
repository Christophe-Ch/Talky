// Discord
const Discord = require('discord.js');
const client = new Discord.Client();

// Configuration
const conf = require('./conf/conf.json');

// Database
const db = require('./conf/database.js');

// Application
const app = require('./execute.js');

client.on('ready', () => {
    db.configure();
    console.log('Listening...');
});

client.on('message', message => {
    if(message.author.bot) return;
    
    app.getReply(message);

});

client.login(conf.token);