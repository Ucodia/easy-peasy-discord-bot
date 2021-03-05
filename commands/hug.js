const discord = require("discord.js");

module.exports = async function(message) {
  if (!message.mentions) {
    // TODO: Send help message to channel
    return;
  }

  message.channel.send(
    `${
      message.author.username
    } has hugged ${message.mentions.users.array().join(" ")}`
  );
};
