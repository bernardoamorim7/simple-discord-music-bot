import { TextChannel } from "discord.js";
import { ICommand } from "../interfaces/icommand";

const play: ICommand = {
    name: 'play',
    aliases: ['p'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const str: string = args.join(' ');

        if (!str) {
            return message.channel.send(`Please enter a song url or query to search.`);
        }

        if (!message.member?.voice.channel) {
            return message.channel.send(`You must be in a voice channel!`);
        }

        client.distube.play(message.member.voice.channel, str, {
            member: message.member,
            textChannel: message.channel as TextChannel,
            message
        });
    }
};

export default play;