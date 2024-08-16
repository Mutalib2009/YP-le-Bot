const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Botun pingini gösterir.'),
    async execute(interaction) {
        await interaction.reply(`Botun pingi: ${interaction.client.ws.ping}ms`);
    },
};
