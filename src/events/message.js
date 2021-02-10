const discord = require("discord.js");
const { has_permission } = require("../permissions.js");

/**
 * Parses the message.
 *
 * @param {discord.Message} message The message which to parse.
 * @param {string} prefix The prefix which the bot uses. This will be used to
 *                        determine the command name.
 * @returns {string[]} An array. The first element is the command name. The second one
 *                     is an array of arguments.
 */
function parse_message(message, prefix) {
    // Split the message into an array, using a space
    // as the seperator. This will result in an array of words.
    const words = message.content.split(" ");

    // Get the first word, and then split the word into two parts.
    // The first part is the prefix, so we don't need it. The second
    // part is the command name itself.
    const command_name = words[0].split(prefix)[1];

    // Remove the first word, which is the command name.
    const args = words.slice(1);

    return [command_name, args];
}

/**
 * Run this event.
 *
 * @param {discord.Message} message
 */
exports.fire = (client, message) => {
    // Ignore messages sent by bots.
    if (message.author.bot) return;
    // Do not respond to DMs.
    if (message.channel.type != "text") return;
    // If the server is not available, for whatever
    // reason, do not continue processing the message.
    if (!message.guild || !message.guild.available) return;
    // If the message does not start with the prefix,
    // the message is not a command.
    if (!message.content.startsWith(client.prefix)) return;

    const parsed_message = parse_message(message, client.prefix);
    const command_name = parsed_message[0];
    const args = parsed_message[1];

    // The user did not mention a command_name with the prefix.
    // The user likely did not intent to run a command.
    if (command_name.length == 0) {
        return;
    }

    // Loop through the commands cache, to find the command
    // that the user requested.
    for (const command_data of client.commands_cache) {
        if (command_data.names == undefined || command_data.command == undefined) {
            // Unfortunately, we cannot log the command name with
            // the message, because info may be undefined, thus not having one.
            console.log("A command does not have the info array or the run function.");

            return;
        }

        // Go through all the names of the command, and
        // check if it is the command requested.
        for (const name of command_data.names) {
            if (name == command_name) {
                let may_run = false;

                // This is the command requested.
                // Now, check for permissions.
                for (const permission of command_data.command.info.permissions_required) {
                    // Check if the user has one of the required permissions.
                    if (has_permission(message.member, permission)) {
                        may_run = true;
                    }
                };

                // The user did not get permission from the permission check.
                // Abort the function.
                if (!may_run) {
                    message.reply("You are not allowed to run that command.");

                    return;
                }

                // The user may execute this command.
                // Call the run function, with the required parameters.
                // I wrapped in a try-catch statement, so the bot doesn't crash
                // when the command fails due to the user using it in a way
                // that's not intended.
                try {
                    command_data.command.run(client, message, args);
                } catch (error) {
                    console.error(error);
                }

                // This is the command the user wanted to
                // execute. Stop checking for other commands.
                return;
            }
        };

        // Because the function returns once it finds the correct
        // command, we can assume the command was not found.
        message.reply("That command does not exist, or is invalid.");
    };
}
