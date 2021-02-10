const { LogBotClient } = require("../client.js");
const { CommandPermissions } = require("../permissions.js");
const discord = require("discord.js");

/**
 * Run this command.
 *
 * @param {LogBotClient} client The client that fired this function.
 * @param {discord.Message} message The message that contains the command.
 * @param {string[]} args An array of words that form the arguments.
 */
exports.run = (client, message, args) => {
    console.log("get_data");
}

exports.info = {
    // The names of the command, that will be used to
    // execute it.
    names: [
        "get_data",
        "data"
    ],
    permissions_required: [
        CommandPermissions.BotManager,
        CommandPermissions.LogManager
    ],
    locked_to: [

    ]
}
