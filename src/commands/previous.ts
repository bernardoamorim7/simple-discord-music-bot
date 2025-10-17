import { ICommand } from "../interfaces/icommand";

const previous: ICommand = {
  name: 'previous',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);

        if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {

      return message.reply(`There is nothing in the queue right now!`);
    }

    const song = queue.previous();
    
    message.reply(`Now playing: ${(await song).name}`);
  }
};

export default previous;