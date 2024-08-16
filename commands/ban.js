const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bir kullanıcıyı sunucudan yasaklar.')
        .addUserOption(option =>
            option.setName('kullanici')
                .setDescription('Yasaklamak istediğiniz kullanıcı')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sebep')
                .setDescription('Yasaklama sebebi')
                .setRequired(false)),
    async execute(interaction) {
        const authorizedRoleId = '1273611578838745132'; // Yetkili rol ID'sini buraya ekleyin

        if (!interaction.guild) {
            return await interaction.reply({ content: 'Bu komut sadece sunucularda çalışır!', ephemeral: true });
        }

        if (!interaction.member.roles.cache.has(authorizedRoleId)) {
            return await interaction.reply({ content: 'Bu komutu kullanmak için yeterli izniniz yok!', ephemeral: true });
        }

        const user = interaction.options.getUser('kullanici');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi';
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return await interaction.reply({ content: 'Kullanıcı sunucuda bulunamadı!', ephemeral: true });
        }
        if (!member.bannable) {
            return await interaction.reply({ content: 'Bu kullanıcıyı yasaklayamıyorum!', ephemeral: true });
        }

        await member.ban({ reason });
        await interaction.reply(`${user.tag} kullanıcısı sunucudan yasaklandı. Sebep: ${reason}`);
    },
};
  
