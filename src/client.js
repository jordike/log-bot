const discord = require("discord.js");
const { readdirSync } = require("fs");

/**
 * The class containing everything to run the
 * patrol log bot.
 */
exports.LogBotClient = class extends discord.Client {
    /**
     * Creates a new instance of the Log Bot.
     *
     * @param {string} prefix The prefix to which the bot responds.
     */
    constructor(prefix) {
        super();

        this.prefix = prefix;
        this.commands_cache = [];
    }

    /**
     * Reads the 'events' directory, relative to this file,
     * and loads all the files in there.
     *
     * The name of an event must be the name of the file.
     * For example, to bind a file to the 'message' event,
     * you'd name the file 'message.js'.
     *
     * The event file must contain a function named 'fire'.
     * The first parameter will always be this client.
     * The other parameters it accepts, depends on the event.
     */
    async load_events() {
        const events = readdirSync(`${__dirname}/events`);

        events.forEach(event_file => {
            // Remove the file extension, so we only
            // have the event name left.
            const event_name = event_file.split(".")[0];
            const event = require(`${__dirname}/events/${event_file}`);

            this.on(event_name, (...parameters) => {
                event.fire(this, ...parameters);
            });

            console.log(`Loaded event ${event_name}.`);
        });
    }

    /**
     * Reads the 'commands' directory, relative to this file,
     * and loads all the files in there.
     *
     * The command file must contain a function named 'run'.
     * It should take 'client', 'message', 'args', as parameters.
     */
    async load_commands() {
        const commands = readdirSync(`${__dirname}/commands`);

        commands.forEach(command_file => {
            const command_name = command_file.split(".")[0];
            const command = require(`${__dirname}/commands/${command_file}`);

            this.commands_cache.push({
                name: command_name,
                command: command
            });

            console.log(`Loaded command ${command_name}.`);
        });
    }

    /**
     * Returns the prefix which marks messages as commands.
     */
    get prefix() {
        return this.prefix;
    }
}
