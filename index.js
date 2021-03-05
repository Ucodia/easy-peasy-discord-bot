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
  if (!Array.isArray(config.scope)) {
    console.log(
      "Info: No scope configuration found, bot will listen to all channels"
    );
  }
  if (!Array.isArray(config.commands)) {
    console.log(
      "Info: No commands configuration found, all commands will be enabled"
    );
  } else {
    config.commands.forEach((command) => {
      if (!commands[command]) {
        console.log(`Info: Command "${command}" does not exists`);
      }
    });
  }
});

client.on("message", (message) => {
  // filter messages out of scope
  if (
    Array.isArray(config.scope) &&
    !config.scope.includes(message.channel.name)
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
    if (Array.isArray(config.commands) && !config.commands.includes(command)) {
      console.log(
        `Skipping command "${command}" as it is not currently enabled`
      );
    } else {
      commands[command](message, ...args);
    }
  } else {
    // TODO: Send help message to channel
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

// self-ping every 30 minutes to keep bot alive
setInterval(async () => {
  const response = await axios.get("https://easy-peasy-discord-bot.glitch.me");
}, 300000);
