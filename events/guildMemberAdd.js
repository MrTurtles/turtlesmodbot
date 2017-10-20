const settings = require('../settings.json');
module.exports = member => {
  let guild = member.guild;
  let modlog = guild.channels.find('name', 'join-leave');
  if (!modlog) return guild.defaultChannel.sendMessage('I cannot find a welcome channel named: join-leave\nMake one!').then(m => m.delete(5000)).catch(console.error);
  guild.channels.get(modlog.id).sendMessage(`${member.user} **Joined!**`);
  if (member.id === settings.ownerid) {
    guild.defaultChannel.sendMessage('**Welcome <@275303108589125633>, the owner of me!**')
  }
};
