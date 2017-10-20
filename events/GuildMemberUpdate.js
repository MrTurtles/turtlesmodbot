const ddiff = require('return-deep-diff');
const Discord = require('discord.js');
module.exports = (oMember, nMember) => {
  let guild = nMember.guild;
  console.log(`-----------------------------\n${nMember.user.username} was removed/given a role or changed nickname in ${guild.name}\n${nMember.user.username} Nickname: ${oMember.nickname} to ${nMember.nickname}\n${nMember.user.username} Roles: in development\n-----------------------------`)
};
