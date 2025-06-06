import { RepeatMode } from "distube";
import { ICommand } from "../interfaces/icommand";

const repeat: ICommand = {
  name: 'repeat',
  aliases: ['loop', 'rp'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);

    if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
      return await message.channel.send(`There is nothing playing!`);
    }

    let mode: RepeatMode;

    switch (args[0]) {
      case 'off':
        mode = RepeatMode.DISABLED;
        break;
      case 'song':
        mode = RepeatMode.SONG;
        break;
      case 'queue':
        mode = RepeatMode.QUEUE;
        break;
    }

    mode = queue.setRepeatMode(mode!);

    await message.channel.send(`Set repeat mode to \`${mode}\``);
  }
};

export default repeat;
