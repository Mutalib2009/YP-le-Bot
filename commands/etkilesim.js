const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('etkilesim')
        .setDescription('Bir kullanıcıya özel mesaj gönderir.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Mesajı göndereceğiniz kullanıcı')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('mesaj')
                .setDescription('Göndermek istediğiniz mesaj')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanıcı');
        const message = interaction.options.getString('mesaj');

        if (!user) {
            return interaction.reply({ content: 'Kullanıcı bulunamadı.', ephemeral: true });
        }

        await user.send(message);
        await interaction.reply({ content: `Mesajınız ${user.tag} kullanıcısına gönderildi.`, ephemeral: true });
    }
};
                                      
