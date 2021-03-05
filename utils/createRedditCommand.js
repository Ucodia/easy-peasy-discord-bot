const discord = require("discord.js");
const reddit = require("../api/reddit");
const { randomOf } = require("./random");

module.exports = (sub) =>
  async function (message) {
    const top = await reddit.getTop(sub);
    const hot = await reddit.getHot(sub);
    const post = randomOf([...top, ...hot]).data;

    const embed = new discord.MessageEmbed()
      .setURL(`https://www.reddit.com${post.permalink}`)
      .setTitle(post.title)
      .setImage(post.url)
      .setFooter(`Provided by ${post.subreddit_name_prefixed}`);

    message.channel.send(embed);
  };