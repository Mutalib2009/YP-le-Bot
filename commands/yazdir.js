const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yazdir')
        .setDescription('Kullanıcının girdiği mesajı yazdırır.')
        .addStringOption(option =>
            option.setName('mesaj')
                .setDescription('Yazdırmak istediğiniz mesaj')
                .setRequired(true)),
    async execute(interaction) {
        const mesaj = interaction.options.getString('mesaj');
        await interaction.reply(mesaj);
    },
};
