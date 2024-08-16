module.exports = {
    name: 'messageCreate',
    async execute(message) {
        console.log('Message received:', message.content); // Mesajın geldiğini görmek için
        const fs = require('fs');
        const path = require('path');
        const configPath = path.join(__dirname, '..', 'config.json');

        if (message.channel.type === 'DM' && !message.author.bot) {
            let config = {};

            if (fs.existsSync(configPath)) {
                config = require(configPath);
            }

            // Mesajın hangi sunucudan geldiğini kontrol etmek
            const logChannelId = config[message.guild?.id]?.logChannel;

            if (logChannelId) {
                const logChannel = await message.client.channels.fetch(logChannelId);
                if (logChannel) {
                    logChannel.send(`DM'den mesaj alındı: ${message.author.tag} - ${message.content}`);
                }
            }
        }
    },
};
