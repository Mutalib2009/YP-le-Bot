const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Belirtilen kullanıcıyı susturmayı kaldırır.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Susturması kaldırılacak kullanıcı')
                .setRequired(true)),
    async execute(interaction) {
        const requiredRoleName = 'Yetkili'; // Bu rolün ismini yetkili rol ismine göre düzenleyin
        const targetUser = interaction.options.getUser('kullanıcı');
        const member = interaction.guild.members.cache.get(targetUser.id);
        const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted'); // 'Muted' rolü ismini rol ismine göre düzenleyin
        const userRoles = interaction.member.roles.cache;

        if (!userRoles.some(role => role.name === requiredRoleName)) {
            return interaction.reply({ content: `Bu komutu kullanmak için ${requiredRoleName} rolüne sahip olmanız gerekir.`, ephemeral: true });
        }

        if (!muteRole) {
            return interaction.reply({ content: 'Bu sunucuda "Muted" rolü bulunamadı.', ephemeral: true });
        }

        if (!member.roles.cache.has(muteRole.id)) {
            return interaction.reply({ content: 'Bu kullanıcı zaten susturulmamış.', ephemeral: true });
        }

        try {
            await member.roles.remove(muteRole);
            return interaction.reply({ content: `${targetUser.tag} kullanıcısının susturması kaldırıldı.`, ephemeral: false });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'Susturma kaldırılırken bir hata oluştu.', ephemeral: true });
        }
    },
};
