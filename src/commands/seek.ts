import { ICommand } from "../interfaces/icommand";

const seek: ICommand = {
  name: 'seek',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);

    if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
      return await message.channel.send(`There is nothing in the queue right now!`);
    }

    if (!args[0]) {
      return await message.channel.send(`Please provide position (in seconds) to seek!`);
    }

    const time: number = Number(args[0]);

    if (isNaN(time)) {
      return await message.channel.send(`Please enter a valid number!`);
    }

    queue.seek(time);

    await message.channel.send(`Seeked to ${time}!`);
  }
};

export default seek;
