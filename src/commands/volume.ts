import { ICommand } from "../interfaces/icommand"

const volume: ICommand = {
  name: 'volume',
  aliases: ['v', 'set', 'set-volume'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);

    if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
      return message.reply(`There is nothing in the queue right now!`);
    }

    const volume = parseInt(args[0]);

    if (isNaN(volume)) {
      return await message.reply(`Please enter a valid number!`);
    }

    queue.setVolume(volume);

    await message.reply(`Volume set to \`${volume}\``);
  }
};

export default volume;
