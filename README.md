# Easy Peasy Discord Bot 🔮

A simple Discord bot that provides mental support to your Discord server 💜

## How to add a command?

To create a new command you need to create a new `.js` file in the `commands` directory. The name of the file matters since it will be used as a command name.

Then copy the following template:
```
module.exports = async (message, arg1) => {
  message.channel.send(`Hello ${arg1}`)
}
```

To enable the command add it to the `commands/index.js` file then try `/mycommand World` on Discord and the bot should answer "Hello World".