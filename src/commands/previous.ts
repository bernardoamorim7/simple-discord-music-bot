import { ICommand } from "../interfaces/icommand";

const previous: ICommand = {
  name: 'previous',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue) {
      return message.channel.send(`There is nothing in the queue right now!`);
    }

    const song = queue.previous();
    
    message.channel.send(`Now playing: ${(await song).name}`);
  }
};

export default previous;