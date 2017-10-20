const Discord = require('discord.js');
exports.run = (client, message, args) => {
  message.delete();
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'logs');
  if (!modlog) return message.reply('I cannot find a log channel named: logs').then(m => m.delete(5000));
  if (reason.length < 1) return message.reply('You must supply a reason for the warning.').then(m => m.delete(5000));
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').then(m => m.delete(5000)).catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'Warning')
    .addField('User:', `${user.username}#${user.discriminator}`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  return client.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'warn',
  rank: 'Helper',
  description: '(HELPER) - Issues a warning to the mentioned user.',
  usage: 'warn [mention] [reason]'
};
