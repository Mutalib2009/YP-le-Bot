const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'config.json');
let config = {};

if (fs.existsSync(configPath)) {
    config = require(configPath);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm-log')
        .setDescription('DM mesajlarını loglayacağınız kanalı ayarlar.')
        .addChannelOption(option =>
            option.setName('kanal')
                .setDescription('DM loglarının gönderileceği kanal')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const logChannel = interaction.options.getChannel('kanal');

        config[interaction.guild.id] = { logChannel: logChannel.id };
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

        await interaction.reply(`DM log kanalı başarıyla ${logChannel} olarak ayarlandı.`);
    },
};
