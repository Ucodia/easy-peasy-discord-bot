require("dotenv").config();
const discord = require("discord.js");
const commands = require("./commands");
const config = require("./config");
const reddit = require("./api/reddit");

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
    message.channel.type !== "dm" &&
    Array.isArray(config.channels) &&
    !config.channels.some((channel) => message.channel.name.endsWith(channel))
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

// schedule a call to Reddit APIs to keep the cache fresh ✨
const callRedditApis = async () =>
  await Promise.all(
    ["cromch", "puppies"].flatMap((sub) => [
      reddit.getTop(sub),
      reddit.getHot(sub),
    ])
  );
callRedditApis();
setInterval(callRedditApis, 15 * 60 * 1000 + 5000);
