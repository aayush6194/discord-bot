require("dotenv").config();
const Discord = require("discord.js");
const moment = require("moment-timezone");
const getAddress = require("./address");
const client = new Discord.Client();
const getWeatherData = require("./weather");
const { format, removeStr, includes } = require("./utils/format");
const fetch = require("node-fetch");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  let {
    content,
    author: { username, bot },
  } = msg;
  if (bot) return;

  content = format(content);

  if (includes(content, ["hey", "hello"])) {
    msg.reply(`Hello ${username}. I am Franky the Bot created by Aayush`);
  } else if (includes(content, ["weather", "temp"])) {
    content = removeStr(content, [/weather/g, /at/g, /temperature/g, /temp/g]);
    const addr = await getAddress(content);
    const weather = await getWeatherData(addr);
    msg.reply(
      `The current Temperature at ${addr.address} is ${weather.temp}F with ${weather.description}`
    );
  } else if (includes(content, ["command"])) {
    content = removeStr(content, [/commands/g, /command/g]);
    msg.reply(
      `Commands I can complete are:
      1. Hello
      2. $weather at "Location"
      3. $remind "Task" on "Date" (eg: $remind "Do homework" on "2020/9/27 18:43" )
      4. $quote`
    );
  } else if (includes(content, ["quote"])) {
    const { author, text } = await fetch("https://type.fit/api/quotes")
      .then((r) => r.json())
      .then((d) => d[Math.floor(Math.random() * (d.length - 1))]);
    msg.reply(`"${text}" - ${author}`);

  } else if (includes(content, ["remind"])) {
    content = removeStr(content, [/\$remind/g, /remind/g]).trim();
    let words = content.split('"');
    words = words.filter((con) => con.length > 1);
    if (words.length !== 3) return;
    const task = words[0];
    const date = moment(words[2]).tz("America/Chicago");
    date.subtract(5, "hours");
    const time = date.valueOf() - moment().tz("America/Chicago").valueOf();

    if (time < 1) {
      msg.reply("The Date has already Past");
    } else {
      msg.reply(`You will be reminded to ${task} on ${date}`);
      setTimeout(
        () => msg.reply(`Reminder for ${username}: ${task} (${date})`),
        time
      );
    }
  }
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "member-log"
  );
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

client.login(process.env.BOT);
