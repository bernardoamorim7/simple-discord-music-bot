import { ICommand } from "../interfaces/icommand";

const nowplaying: ICommand = {
  name: 'nowplaying',
  aliases: ['np'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);

        if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {

      return message.reply(`There is nothing in the queue right now!`);
    }

    const song = queue.songs[0];

    message.reply(`I'm playing **\`${song.name}\`**, by ${song.user}`);
  }
};

export default nowplaying;