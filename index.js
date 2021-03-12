require("dotenv").config();
const discord = require("discord.js");
const axios = require("axios");
const commands = require("./commands");
const config = require("./config");

const client = new discord.Client();

client.once("ready", () => {
  console.log(`Bot started at ${new Date().toISOString()} with config:`);
  console.log(JSON.stringify(config, null, 2));

  // verify config
  if (!Array.isArray(config.channels)) {
    console.log(
      "Info: No channels configuration found, bot will listen to all channels"
    );
  }
});

client.on("message", (message) => {
  // filter messages out of scope
  if (
    Array.isArray(config.channels) &&
    !config.channels.includes(message.channel.name)
  )
    return;
  // filter messages from bots
  if (message.author.bot) return;
  // filter messages without prefix
  if (!message.content.startsWith(config.prefix)) return;

  // decompose message into command and arguments
  const args = message.content.slice(config.prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (commands[command]) {
    commands[command](message, ...args);
  } else {
    // TODO: Send help message to channel
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
