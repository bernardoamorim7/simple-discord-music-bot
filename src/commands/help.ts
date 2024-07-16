import { ICommand } from "../interfaces/icommand";
import { EmbedBuilder } from 'discord.js';

const help: ICommand = {
    name: 'help',
    aliases: ['h', 'cmd', 'command'],
    inVoiceChannel: false,
    run: async (client, message) => {
        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Commands')
                    .setDescription(client.commands.map(cmd => `\`${cmd.name}\``).join(', '))
            ]
        });
    }
};

export default help;