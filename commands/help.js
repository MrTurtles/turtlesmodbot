const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.author.sendEmbed(
      new Discord.RichEmbed()
      .setColor(0x00AE86)
      .addField('= Command List = ', `Use ${settings.prefix}help <commandname> for details\n\n${client.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} - ${c.help.rank}`).join('\n')}`));
    message.delete();
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendEmbed(
        new Discord.RichEmbed()
      .setColor(0x00AE86)
      .addField(`= ${command.help.name} =`, ` \n${command.help.description}\nusage - ${settings.prefix}${command.help.usage}\n`));
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h'],
  permLevel: 1
};

exports.help = {
  name: 'help',
  rank: 'Member',
  description: 'Displays all the available commands for your permission\n                          level.\n',
  usage: 'help [command]'
};
