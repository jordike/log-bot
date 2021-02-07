const { LogBotClient } = require("./client.js");
const client = new LogBotClient();

client.load_events();
client.load_commands();

// Check if this bot is being run on a host.
// If it is, the .env variables should be set.
if (process.env.BOT_TOKEN) {
    // We are being run on a host.

    client.login(process.env.BOT_TOKEN);
} else {
    // We are run locally (testing).
    // Use a .json file for local development
    // settings, for example the token to the
    // test bot.

    const local_settings = require("../local_settings.json");

    client.login(local_settings.bot_token);
}
