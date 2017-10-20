const Discord = require('discord.js');
exports.run = (client, message, args) => {
  client.user.setStatus('test', 1, 'https://www.twitch.tv/dave_mrturtles');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 6
};

exports.help = {
  name: 'setstatus',
  rank: 'Owner',
  description: '(OWNER) - Sets the status of the bot to streaming.',
  usage: 'status'
};
