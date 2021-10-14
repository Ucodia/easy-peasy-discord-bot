const discord = require("discord.js");
const reddit = require("../api/reddit");
const { randomOf } = require("./random");

module.exports = (sub) => async (message) => {
  const top = await reddit.getTop(sub);
  const hot = await reddit.getHot(sub);
  // const post = (await reddit.getRandom(sub)).data;

  let post = null;
  let imageUrl = "";

  do {
    post = randomOf([...top, ...hot]).data;
    imageUrl = post.is_reddit_media_domain ? post.url : post.thumbnail;
  } while (!imageUrl.startsWith("http"));

  const embed = new discord.MessageEmbed()
    .setURL(`https://www.reddit.com${post.permalink}`)
    .setTitle(post.title)
    .setImage(imageUrl)
    .setFooter(`Provided by ${post.subreddit_name_prefixed}`);

  message.channel.send(embed);
};
