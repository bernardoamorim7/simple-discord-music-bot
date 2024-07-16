import { TextChannel } from "discord.js";
import { ICommand } from "../interfaces/icommand";

const playstop: ICommand = {
  name: 'playtop',
  aliases: ['pt'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ');

    if (!string) {
      return message.channel.send(`Please enter a song url or query to search.`);
    }

    if (!message.member?.voice.channel) {
      return message.channel.send(`You must be in a voice channel!`);
    }

    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel as TextChannel,
      message,
      position: 1
    });
  }
};

export default playstop;
