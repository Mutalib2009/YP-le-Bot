const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

// .env dosyasından bot token'ını al
require('dotenv').config();

const clientId = '1272871423471259701'; // Botunuzun client ID'si
const token = process.env.TOKEN;

// Komut dosyalarını içe aktar
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Global komutlar kaydediliyor...');

        await rest.put(Routes.applicationCommands(clientId), { body: commands });

        console.log('Global komutlar başarıyla kaydedildi!');
    } catch (error) {
        console.error('Komutları kaydederken bir hata oluştu:', error);
    }
})();
