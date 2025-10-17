import { ICommand } from "../interfaces/icommand";

const forward: ICommand = {
  name: 'forward',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);

    if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
      return await message.reply(`There is nothing in the queue right now!`);
    }

    if (!args[0]) {
      return await message.reply(`Please provide time (in seconds) to go forward!`);
    }

    const time: number = Number(args[0]);

    if (isNaN(time)) {
      return await message.reply(`Please enter a valid number!`);
    }

    queue.seek((queue.currentTime + time));

    await message.reply(`Forwarded the song for ${time}!`);
  }
};

export default forward;
