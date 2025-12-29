const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TARGET_USER_ID = '123456789012345678'; 

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  
    if (message.author.bot) return;

    if (message.author.id === TARGET_USER_ID) {
        message.reply('I received your message!');
    }
});

client.login('YOUR_TOKEN');
