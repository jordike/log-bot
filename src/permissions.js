const discord = require("discord.js");

// Unfortunately, JavaScript doesn't support enums.
// An array will have to do instead.
exports.CommandPermissions = {
    // The bot creator, in order to help
    // with debugging if needed.
    BotManager: 2,

    // People with permission to clear the logs.
    LogManager: 1,

    // People using the bot.
    User: 0
}

// Create an alias to the array above, so it's
// shorter to write and easier to read.
const perms = exports.CommandPermissions;

/**
 *
 * @param {discord.GuildMember} member The member being checked.
 * @param {number} permission The permission we check if the user has.
 * @returns {boolean} A boolean indicating if the user has the permission.
 */
exports.has_permission = (member, permission) => {
    // We do not need breaks in this switch-statement,
    // because the returns will end the function instead.
    switch (permission) {
        case perms.BotManager: {
            // If the user has my ID.
            return member.id == "208666671194439681";
        };

        case perms.LogManager: {
            // TODO: Implement this.
            return false;
        }

        case perms.User: {
            // People will always have the User permission.
            return true;
        }

        // In case I forget to handle a new permission.
        default: {
            return false;
        }
    }
}
