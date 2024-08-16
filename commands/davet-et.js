const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('davet-et')
        .setDescription('Botu davet etmek ve destek sunucusuna katılmak için linkler.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(`${interaction.client.user.username} Botunu Davet Et`)
            .setDescription('Botun davet linklerine ve destek sunucusuna buradan ulaşabilirsiniz.')
            .addFields(
                { name: 'Botu Davet Et', value: '[Davet Linki](https://discord.com/oauth2/authorize?client_id=1272871423471259701&permissions=8&integration_type=0&scope=bot+applications.commands)' },
                { name: 'Destek Sunucusu', value: '[Destek Linki](https://discord.gg/your-support-server-invite)' }
            )
            .setFooter({ text: 'Bizi tercih ettiğiniz için teşekkür ederiz!', iconURL: interaction.client.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
                 
