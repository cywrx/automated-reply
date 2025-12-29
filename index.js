const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

const TOKEN = "ur token";

let replyConfig = {
    targetUser: null,
    targetChannel: null,
    replyText: null,
    delayMs: 0,
    active: false
};

client.on('ready', () => console.log(`online: ${client.user.tag}`));

client.on('messageCreate', async (msg) => {
    if (msg.author.id !== client.user.id) {
        if (replyConfig.active && msg.author.id === replyConfig.targetUser) {

            const isTargetChannel = msg.channel.id === replyConfig.targetChannel;
            const isDM = msg.channel.type === 'DM' && replyConfig.targetChannel === "dm";

            if (isTargetChannel || isDM) {
                setTimeout(async () => {
                    try {
                        await msg.reply(replyConfig.replyText);
                    } catch (err) { console.error("err", err.message); }
                }, replyConfig.delayMs);
            }
        }
        return;
    }

    const content = msg.content.toLowerCase();

    if (content === 'stop') {
        replyConfig.active = false;
        return msg.reply("disabled");
    }

    if (content === 'status') {
        return msg.reply(replyConfig.active ? `running: ${replyConfig.targetUser}` : "offline");
    }

    if (msg.content.startsWith('start')) {
        const lines = msg.content.split('\n');
        if (lines.length < 5) return msg.reply("invalid format");

        replyConfig = {
            targetUser: lines[1].trim(),
            targetChannel: lines[2].trim().toLowerCase(),
            replyText: lines[3].trim(),
            delayMs: (parseInt(lines[4]) || 0) * 1000,
            active: true
        };

        msg.reply("active");
    }
});

client.login(TOKEN);

