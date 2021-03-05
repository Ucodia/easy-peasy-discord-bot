const discord = require("discord.js");
const reddit = require("../api/reddit");
const { randomOf } = require("../utils/random");
const SUB = "puppies";

module.exports = async function (message) {
  const top = await reddit.getTop(SUB);
  const hot = await reddit.getHot(SUB);
  const post = randomOf([...top, ...hot]).data;

  const embed = new discord.MessageEmbed()
    .setURL(`https://www.reddit.com${post.permalink}`)
    .setTitle(post.title)
    .setImage(post.url)
    .setFooter(`Provided by ${post.subreddit_name_prefixed}`);
  message.channel.send(embed);
};
