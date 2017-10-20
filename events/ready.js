const chalk = require('chalk');
const Discord = require('discord.js');
//const client = new Discord.Client();
module.exports = client => {
  console.log(chalk.green('I\'m Online'));
  let login = `;help | I Like Turtles! | ${client.guilds.array().length} Guilds!`
  client.user.setGame(login);
  console.log(chalk.green('Game set to: ' + login));
};
