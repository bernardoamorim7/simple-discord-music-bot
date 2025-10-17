import { ICommand } from "../interfaces/icommand";

const skipto: ICommand = {
  name: 'skipto',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);

    if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
      return await message.reply(`There is nothing in the queue right now!`);
    }

    if (!args[0]) {
      return await message.reply(`Please provide time (in seconds) to go rewind!`);
    }

    const num: number = Number(args[0]);

    if (isNaN(num)) {
      return await message.reply(`Please enter a valid number!`);
    }

    await client.distube.jump(message, num).then(song => {
      message.reply({ content: `Skipped to: ${song.name}` });
    });
  }
};

export default skipto;