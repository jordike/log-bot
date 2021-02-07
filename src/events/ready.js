const { LogBotClient } = require("../client.js");

/**
 * Process the event.
 *
 * @param {LogBotClient} client The client that fired this function.
 */
exports.fire = (client) => {
    client.user.setActivity({
        name: "you doing your patrol",
        type: "WATCHING"
    });

    console.log("The patrol log bot is now online, and ready to annoy unsuspecting players.");
}
