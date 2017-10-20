exports.run = (client, message, args) => {
  message.delete();
  let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0];
  let modlog = message.guild.channels.find('name', 'logs');
  if (!modlog) return message.reply('I cannot find a log channel named: logs').then(m => m.delete(5000));
  if (reason.length < 1) return message.reply('You must supply a reason for the unban.').then(m => m.delete(5000));
  if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').then(m => m.delete(5000)).catch(console.error);
  message.guild.unban(user);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'unban',
  rank: 'Admin',
  description: '(ADMIN) - Unbans the user.',
  usage: 'unban [mention] [reason]'
};
