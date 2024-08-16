const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('durum')
        .setDescription('Botun durumunu ayarlar.')
        .addStringOption(option =>
            option.setName('durum')
                .setDescription('Botun durumunu belirleyin')
                .setRequired(true)),
    async execute(interaction) {
        // Botu oluşturan kişinin ID'sini buraya ekleyin
        const botOwnerId = '1256186494830252033'; // Botun oluşturucusunun Discord ID'si

        // Kullanıcının bot sahibi olup olmadığını kontrol et
        if (interaction.user.id !== botOwnerId) {
            return await interaction.reply({ content: 'Bu komutu kullanma izniniz yok!', ephemeral: true });
        }

        // Kullanıcının belirlediği durumu al
        const durum = interaction.options.getString('durum');

        try {
            // Botun durumunu ayarla
            await interaction.client.user.setPresence({
                activities: [{ name: durum }],
                status: 'online',
            });

            await interaction.reply({ content: `Botun durumu başarıyla \`${durum}\` olarak ayarlandı.`, ephemeral: true });
        } catch (error) {
            console.error('Durum ayarlanırken bir hata oluştu:', error);
            await interaction.reply({ content: 'Durum ayarlanırken bir hata oluştu.', ephemeral: true });
        }
    },
};

