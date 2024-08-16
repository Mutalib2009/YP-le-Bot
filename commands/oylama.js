const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('oylama')
        .setDescription('Bir oylama başlatır.')
        .addStringOption(option => 
            option.setName('başlık')
                .setDescription('Oylamanın başlığı')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('seçenek1')
                .setDescription('Birinci seçenek')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('seçenek2')
                .setDescription('İkinci seçenek')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('seçenek3')
                .setDescription('Üçüncü seçenek')),
    async execute(interaction) {
        const title = interaction.options.getString('başlık');
        const option1 = interaction.options.getString('seçenek1');
        const option2 = interaction.options.getString('seçenek2');
        const option3 = interaction.options.getString('seçenek3');
        
        let options = `${option1}\n${option2}`;
        if (option3) options += `\n${option3}`;

        const pollEmbed = {
            color: 0x0099ff,
            title: title,
            description: options,
            timestamp: new Date(),
        };

        const pollMessage = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });

        await pollMessage.react('👍');
        await pollMessage.react('👎');

        if (option3) {
            await pollMessage.react('🤷');
        }
    }
};
          
