const Discord = require('discord.js');
exports.run = (client, message, args) => {
  message.delete();
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'logs');
  if (!modlog) return message.reply('I cannot find a log channel named: logs').then(m => m.delete(5000));
  if (reason.length < 1) return message.reply('You must supply a reason for the kick.').then(m => m.delete(5000));
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').then(m => m.delete(5000)).catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member').then(m => m.delete(5000));
  message.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'kick')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  return client.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'kick',
  rank: 'Moderator',
  description: '(MOD) - Kicks the mentioned user.',
  usage: 'kick [mention] [reason]'
};
