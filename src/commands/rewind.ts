import { ICommand } from "../interfaces/icommand";

const rewind: ICommand = {
  name: 'rewind',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);

        if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {

      return message.reply(`There is nothing in the queue right now!`);
    }

    if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
      return await message.reply(`Please provide time (in seconds) to go rewind!`);
    }

    const time: number = Number(args[0]);

    if (isNaN(time)) {
      return await message.reply(`Please enter a valid number!`);
    }

    queue.seek((queue.currentTime - time));

    await message.reply(`Rewinded the song for ${time}!`);
  }
};

export default rewind;