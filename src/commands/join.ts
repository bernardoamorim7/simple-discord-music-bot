import { ICommand } from "../interfaces/icommand";
import { Constants, VoiceChannel } from "discord.js";

const join: ICommand = {
  name: 'join',
  aliases: ['move'],
  inVoiceChannel: false,
  run: async (client, message, args) => {
    let voiceChannel = message.member?.voice.channel;

    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0]) as VoiceChannel;

      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return await message.reply(`${args[0]} is not a valid voice channel!`);
      }
    }

    if (!voiceChannel) {
      return await message.reply(
        `You must be in a voice channel or enter a voice channel id!`
      );
    }

    await client.distube.voices.join(voiceChannel);
  }
};

export default join;
