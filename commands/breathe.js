const discord = require("discord.js");

module.exports = async (message) => {
  const embed = new discord.MessageEmbed();

  embed
    .setTitle("Breathe 🫁")
    .setDescription(
      'This animation demonstrates "box breathing", a method useful to keep composure in stressful situations. Following the breathing pattern should help bring back calm and control.'
    )
    .setImage("https://i.imgur.com/0ayuo9B.gif")
    .setFooter("Take care 💜");

  message.channel.send(embed);
};
