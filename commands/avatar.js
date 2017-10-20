const Discord = require('discord.js');
exports.run = (client, message, args) => {
  message.delete();
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You must mention someone.').then(m => m.delete(5000)).catch(console.error);
  const embed98 = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField(`Avatar of ${user.username}`, `${user.avatarURL}`)
    .setThumbnail(user.avatarURL)
  message.channel.sendEmbed(embed98);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ava', 'av'],
  permLevel: 1
};

exports.help = {
  name: 'avatar',
  rank: 'Member',
  description: '(MEMBER) - Gets the avatarURL of the mentioned user.',
  usage: 'avatar [mention]'
};
