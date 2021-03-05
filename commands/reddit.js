const discord = require("discord.js");
const reddit = require("../api/reddit");
const { randomOf } = require("../utils/random");

const commandsToSub = {
  cats: "cats",
  cat: "cats",
  kitty: "kittens",
  kitten: "kittens",
  kittens: "kittens",
  cromch: "cromch",
  catnip: "catnip",
  dog: "dogs",
  dogs: "dogs",
  puppy: "puppies",
  puppies: "puppies",
  wholesome: "wholesomememes"
};
const allCommands = Object.keys(commandsToSub);

module.exports = async function(message, command) {
  const embed = new discord.MessageEmbed();

  if (!allCommands.includes(command)) {
    embed
      .setTitle("Reddit 🐶😺")
      .addField("Commands", `/reddit <${allCommands.join(" ")}>`);
  } else {
    const sub = commandsToSub[command];
    const top = await reddit.getTop(sub);
    const post = randomOf(top).data;

    embed
      .setURL(`https://www.reddit.com${post.permalink}`)
      .setTitle(post.title)
      .setImage(post.url)
      .setFooter(`Provided by ${post.subreddit_name_prefixed}`);
  }

  message.channel.send(embed);
};
