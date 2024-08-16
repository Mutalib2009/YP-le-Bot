const { SlashCommandBuilder } = require('discord.js');

// Yetkili rol ID'sini buraya girin
const AUTHORIZED_ROLE_ID = '1273611578838745132';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Kullanıcıyı banlı listeden çıkarır.')
        .addUserOption(option => option.setName('kullanıcı').setDescription('Banı kaldırılacak kullanıcı').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.has(AUTHORIZED_ROLE_ID)) {
            return interaction.reply({ content: 'Bu komutu kullanma yetkiniz yok.', ephemeral: true });
        }

        const user = interaction.options.getUser('kullanıcı');
        const guild = interaction.guild;

        try {
            await guild.members.unban(user.id);
            await interaction.reply({ content: `${user.tag} kullanıcısının banı kaldırıldı.` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Ban kaldırma işlemi sırasında bir hata oluştu.', ephemeral: true });
        }
    }
};
