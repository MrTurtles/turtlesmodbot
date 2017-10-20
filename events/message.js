const settings = require('../settings.json');
const Discord = require('discord.js')
module.exports = message => {
  const embed66 = new Discord.RichEmbed()
    .setColor(0x00EB1A1A)
    .setTimestamp()
    .addField(`Error :no_entry:`, `Commands do not work in Direct Messages!`)
  const embed67 = new Discord.RichEmbed()
    .setColor(0x00EB1A1A)
    .setTimestamp()
    .addField(`**Banned** :no_entry:`, `You are banned to use bots!`)
  const embed61 = new Discord.RichEmbed()
    .setColor(0x00EB1A1A)
    .setTimestamp()
    .addField(`**Banned** :no_entry:`, `Muted for using commands while banned.`)
  const embed111 = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'Auto-Mute')
    .addField('User:', `${message.author}`)
    .addField('Moderator:', `<@304258486466904064>`)
    .addField('Duration:', `30 Minutes`)
    .addField('Reason:', `Using bot commands while banned`)

  
  var filtered = ["fuck", "cunt", "nigger", "bitch", "dick", "pussy", "fucker",
 "nigga", "cock", "fucking", "motherfuck", "motherfucker", "cousinfucker", "cousinfuck", "cocksucker",
 "fucked", "motherfuckers", "cousinfuckers", "fuckers", "cocksuckers", "bitchs", "bitches",
 "titty", "titties", "tittys", "moonman", "ass", "asses", "kkk", "cunts", "hoe",
 "hoes", "slut", "sluty", "slutty", "sluts", "dicks", "niggers", "niggas", "adolf", "hitler", "rape",
 "raped", "rapes", "cum", "cums", "cumming", "masterbate", "masterbait", "masterbaits", "masterbates",
 "masterbaiting", "masterbateing", "masterbating", "anal"];

  let client = message.client;
  if (message.author.bot) return;
  let user33 = message.author; 
  //let role33 = message.guild.roles.find('name', settings.bannedrolename);
  //let modlog = message.guild.channels.find('name', 'logs');
  //let muteRole = message.guild.roles.find('name', 'Muted');
  //if (!modlog) return message.reply('I cannot find a log channel named: logs\nMake one!').then(m => m.delete(5000)).catch(console.error);
  //if (!muteRole) return message.reply('I cannot find a mute role named: Muted (Case Sensitive').then(m => m.delete(5000)).catch(console.error);
  //if (message.content.indexOf("dave" || "Dave")) {
  //  message.react('name', ':ok_hand:');
  //  }
  for (var filter of filtered) {
        if (message.content.indexOf(filter) !== -1) {
          if (message.guild = 326017266292490241) return;
            message.delete(message.author, message.server).then(() => {
                message.reply(`LANGUAGE!! :japanese_goblin:`).then(m => m.delete(5000))
            }).catch(error => console.log(error));
            return;
        }
  }
  //if (message.content.indexOf(badwords) !== -1) {
  //  message.delete();
  //  message.reply('LANGUAGE!!! :japanese_goblin:').then(m => m.delete(5000));
  //}
  if (!message.content.startsWith(settings.prefix)) return;
  if (client.elevation(message) == 0) return message.channel.sendEmbed(embed67) && message.delete();
  //if (message.guild.member(user33).roles.has(role33.id)) return message.channel.sendEmbed(embed67) && message.delete();
  if (message.channel.type == 'dm') return message.channel.sendEmbed(embed66);
  if (message.channel.type == 'group') return message.channel.sendEmbed(embed66);
  let command = message.content.split(' ')[0].slice(settings.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  const embed65 = new Discord.RichEmbed()
    .setColor(0x00EB1A1A)
    .setTimestamp()
    .addField(`:no_entry: No Permission`, `${message.author}, You have no permission for the command: **${command}**`)
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
    console.log(`[${perms}]${message.author.username}: ${command} ${params}\n`)
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
    console.log(`[${perms}]${message.author.username}: ${command} ${params}\n`)
  } else {
    const embed69 = new Discord.RichEmbed()
      .setColor(0x00EB1A1A)
      .setTimestamp()
      .addField(`:no_entry: Error`, `${message.author}, That command is not registered.`)
    message.channel.sendEmbed(embed69).then(m => m.delete(5000))
    message.delete()
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return message.channel.sendEmbed(embed65).then(m => m.delete(5000));
    cmd.run(client, message, params, perms);
  }

};
