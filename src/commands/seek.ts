import { ICommand } from "../interfaces/icommand";

const seek: ICommand = {
  name: 'seek',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);

    if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
      return await message.reply(`There is nothing in the queue right now!`);
    }

    if (!args[0]) {
      return await message.reply(`Please provide position (in seconds) to seek!`);
    }

    const time: number = Number(args[0]);

    if (isNaN(time)) {
      return await message.reply(`Please enter a valid number!`);
    }

    queue.seek(time);

    await message.reply(`Seeked to ${time}!`);
  }
};

export default seek;
