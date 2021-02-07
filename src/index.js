const discord = require("discord.js");
const client = new discord.Client();

client.on("ready", () => {
    console.log("ready");
});

client.login(process.env.BOT_TOKEN);
