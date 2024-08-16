const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sil')
        .setDescription('Belirtilen sayıda mesajı siler.')
        .addIntegerOption(option =>
            option.setName('miktar')
                .setDescription('Silmek istediğiniz mesaj sayısı')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)),
    async execute(interaction) {
        const miktar = interaction.options.getInteger('miktar');

        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return await interaction.reply({ content: 'Bu komutu kullanmak için gerekli izne sahip değilsiniz!', ephemeral: true });
        }

        // Silinecek mesaj sayısını sınırla
        if (miktar > 100) {
            return await interaction.reply({ content: 'En fazla 100 mesaj silebilirsiniz!', ephemeral: true });
        }

        try {
            // Mesajları sil
            await interaction.channel.messages.fetch({ limit: miktar })
                .then(messages => interaction.channel.bulkDelete(messages, true));
            await interaction.reply({ content: `${miktar} mesaj silindi.`, ephemeral: true });
        } catch (error) {
            console.error('Mesajlar silinirken bir hata oluştu:', error);
            await interaction.reply({ content: 'Mesajları silerken bir hata oluştu.', ephemeral: true });
        }
    },
};
                                     
