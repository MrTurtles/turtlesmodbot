const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed16 = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .addField(`Error :no_entry:`, `You're missing a number of messages to delete!`);
  let messagecount = parseInt(args.join(' '));
  if(messagecount > 100) {
    message.delete();
    message.channel.sendMessage('Limit is 100!');
  }
  if(!messagecount) {
    message.channel.sendEmbed(embed16).then(m => m.delete(5000));
    message.delete();
    return;
  }
  message.channel.fetchMessages({
    limit: messagecount + 1
  }).then(messages => message.channel.bulkDelete(messages));
  const embed15 = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .addField(`Succes :white_check_mark:`, `Succesfully deleted ${messagecount} messages!`);
  message.channel.sendEmbed(embed15).then(m => m.delete(5000));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'clear',
  rank: 'Admin',
  description: '(ADMIN) - Cleares X amount of messages from a given channel.',
  usage: 'clear <number>'
};
