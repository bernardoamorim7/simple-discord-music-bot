import { ICommand } from "../interfaces/icommand";

const shuffle: ICommand = {
  name: 'shuffle',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
      return message.reply(`There is nothing in the queue right now!`);
    }

    await queue.shuffle();

    message.reply('Shuffled songs in the queue');
  }
};

export default shuffle;
