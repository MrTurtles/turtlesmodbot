const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, args) => {
  message.delete();
  let time = args.slice(1).join(' ').split('?');
  let reason = args.slice(2).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'logs');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!modlog) return message.reply('I cannot find a log channel named: logs').then(m => m.delete(5000)).catch(console.error);
  if (!muteRole) return message.reply('I cannot find a mute role named: Muted (Case Sensitive').then(m => m.delete(5000)).catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').then(m => m.delete(5000)).catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'Unmute')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').then(m => m.delete(5000)).catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole)
    message.reply(`:white_check_mark: Succesfully unmuted ${user.username}#${user.discriminator}`).then(m => m.delete(5000));
    client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);    
  } else {
      message.reply(`That user is not muted.\nTo mute him/her use: ${settings.prefix}mute [user] [duration] [reason]`).then(m => m.delete(5000));
  };

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unmute',
  rank: 'Moderator',
  description: '(MOD) - Unmutes a mentioned user',
  usage: 'unmute [mention]'
};
