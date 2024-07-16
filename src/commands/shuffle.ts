import { ICommand } from "../interfaces/icommand";

const shuffle: ICommand = {
  name: 'shuffle',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue) {
      return message.channel.send(`There is nothing in the queue right now!`);
    }

    queue.shuffle();

    message.channel.send('Shuffled songs in the queue');
  }
};

export default shuffle;
