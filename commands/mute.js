const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Belirli bir süre boyunca bir kullanıcıyı sessize alır.')
        .addUserOption(option =>
            option.setName('kullanici')
                .setDescription('Sessize almak istediğiniz kullanıcı')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('sure')            .setDescription('Sessiz kalma süresi (dakika)')
                .setRequired(true)),
    async execute(interaction) {
        const authorizedRoleId = '1273611578838745132'; // Yetkili rol ID'sini buraya ekleyin
        const muteRoleName = 'Muted'; // Sessize alma rolü adı

        if (!interaction.guild) {
            return await interaction.reply({ content: 'Bu komut sadece sunucularda çalışır!', ephemeral: true });
        }

        if (!interaction.member.roles.cache.has(authorizedRoleId)) {
            return await interaction.reply({ content: 'Bu komutu kullanmak için yeterli izniniz yok!', ephemeral: true });
        }

        const user = interaction.options.getUser('kullanici');
        const duration = interaction.options.getInteger('sure');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return await interaction.reply({ content: 'Kullanıcı sunucuda bulunamadı!', ephemeral: true });
        }

        const muteRole = interaction.guild.roles.cache.find(role => role.name === muteRoleName);
        if (!muteRole) {
            return await interaction.reply({ content: 'Sunucuda "Muted" rolü bulunamadı. Lütfen rolü oluşturun.', ephemeral: true });
        }

        await member.roles.add(muteRole);
        await interaction.reply(`${user.tag} kullanıcısı ${duration} dakika boyunca sessize alındı.`);

        setTimeout(async () => {
            await member.roles.remove(muteRole);
            console.log(`${user.tag} kullanıcısının sessizliği kaldırıldı.`);
        }, duration * 60 * 1000); // dakika -> milisaniye
    },
};
