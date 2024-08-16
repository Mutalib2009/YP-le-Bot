const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Bir kullanıcının profil fotoğrafını gösterir.')
        .addUserOption(option =>
            option.setName('kullanici')
                .setDescription('Profil fotoğrafını görmek istediğiniz kullanıcı')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanici') || interaction.user;
        await interaction.reply(user.displayAvatarURL({ size: 1024, dynamic: true }));
    },
};
