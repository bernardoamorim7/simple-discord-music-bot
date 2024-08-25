import { ICommand } from "../interfaces/icommand";

const filter: ICommand = {
  name: 'filter',
  aliases: ['filters'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);

    if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
      return await message.channel.send(`There is nothing in the queue right now!`);
    }

    const filter: string = args[0];

    if (filter === 'off' && queue.filters.size) {
      queue.filters.clear();
    } else if (Object.keys(client.distube.filters).includes(filter)) {
      if (queue.filters.has(filter)) {
        queue.filters.remove(filter);
      } else {
        queue.filters.add(filter);
      }
    } else if (args[0]) {
      return await message.channel.send(`Not a valid filter`);
    }

    await message.channel.send(`Current Queue Filter: \`${queue.filters.names.join(', ') || 'Off'}\``);
  }
};

export default filter;