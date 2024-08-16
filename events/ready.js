const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Bot ${client.user.tag} olarak giriş yaptı!`);

        // Komutların kaydedilme durumunu kontrol etme
        try {
            const globalCommands = await client.application.commands.fetch();
            console.log(`Global komut sayısı: ${globalCommands.size}`);

            // Sunucuya özel komutları kontrol etme
            const guildCommands = await client.guilds.cache.get(process.env.GUILD_ID)?.commands.fetch() || [];
            console.log(`Sunucuya özel komut sayısı: ${guildCommands.size}`);
        } catch (error) {
            console.error('Komutları kontrol ederken bir hata oluştu:', error.message);
        }

        // Botun mevcut aktivitesini ayarlama
        try {
            await client.user.setActivity('Aktif', { type: 'PLAYING' });
            console.log('Botun aktivitesi başarıyla ayarlandı!');
        } catch (error) {
            console.error('Botun aktivitesini ayarlarken bir hata oluştu:', error.message);
        }
    },
};
                                          
