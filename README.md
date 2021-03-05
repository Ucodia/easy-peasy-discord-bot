# Easy Peasy Discord Bot 🔮

A simple Discord bot that provides mental support to your Discord server 💜

## Configuration

- To enable the bot on a channel, the channel name needs to be added to the `scope` configuration in `config.js` file
- To enable a bot command, the command name needs to be added to the `commands` configuration in `config.js` file

## How to add a command?

To create a new command you need to create a new `.js` file in the `commands` directory.
The name of the file matters since it will be used as a command name.

Then copy the following template:
```
module.exports = async function(message, arg1) {
  message.channel.send(`Hello ${arg1}`)
}
```

Then add your command to the `commands/index.js` file and add it to the `commands` configuration in `config.js` file.

Your command should now be enabled, try  `/mycommand World` on Discord and the bot should answer "Hello World".