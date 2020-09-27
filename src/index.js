const Discord = require('discord.js');
const getAddress = require('./address');
const client = new Discord.Client();

const getWeatherData = require('./weather');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  let { content, author: { username, bot } } = msg;
  if (bot) return;

  content = content.trim().toLowerCase();
  if (content.includes('hello')) {
    msg.reply('Hello ' + username);
  } else if (content.includes('weather') || content.includes('temp') ) {
    content = content.replace(/weather/g, '');
    content = content.replace(/at/g, '');
    content = content.replace(/temp/g, '');
    const addr = await getAddress(content);
    const weather = await getWeatherData(addr);
    msg.reply(`Current Temperature is: ${weather.temp}F at ${addr.address}`)
  }

});


client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

client.login('NzU5NjMwODE4MjUwMzI2MDY2.X3ATVA.ju7tR58I8tUDRIoUNgx2BbzR_tY')
