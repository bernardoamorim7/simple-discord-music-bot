import { TextChannel } from "discord.js";
import { ICommand } from "../interfaces/icommand";

const playskip: ICommand = {
  name: 'playskip',
  aliases: ['ps'],
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
      skip: true
    });
  }
};

export default playskip;
