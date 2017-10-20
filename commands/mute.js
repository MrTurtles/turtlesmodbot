const Discord = require('discord.js');
const settings = require('../settings.json');
//const sleep = require('system-sleep');
const sleep = require('sleep');
exports.run = (client, message, args) => {
  message.delete();
  let time = args.slice(1).join(' ');
  //let reason = args.slice(2).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'logs');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!modlog) return message.reply('I cannot find a log channel named: logs\nMake one!').then(m => m.delete(5000)).catch(console.error);
  if (!muteRole) return message.reply('I cannot find a mute role named: Muted (Case Sensitive').then(m => m.delete(5000)).catch(console.error);
  //if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').then(m => m.delete(5000)).catch(console.error);
  if (time.length < 1) return message.reply('You must set a duration!').then(m => m.delete(5000));
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'Mute')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Duration:', `${time} Minutes`)
    //.addField('Reason:', reason)

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').then(m => m.delete(5000)).catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.reply(`This user is already muted.\nTo unmute this user use: ${settings.prefix}unmute [user]`).then(m => m.delete(5000)); 
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      message.reply(`:white_check_mark: Succesfully muted ${user.username}#${user.discriminator} for ${time} minutes`).then(m => m.delete(5000));
      client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
      setTimeout(function() {
        message.guild.member(user).removeRole(muteRole);
      }, time*60000); 
    }); 
  } 

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  rank: 'Moderator',
  description: '(MOD)- Mutes a mentioned user with specific time',
  usage: 'mute [user] [duration] '//[reason]'
};
