import { ICommand } from "../interfaces/icommand";

const autoplay: ICommand = {
  name: 'autoplay',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
      return await message.reply(`${client.emojis} | There is nothing in the queue right now!`);
    }

    const autoplay: boolean = queue.toggleAutoplay();

    await message.reply(`AutoPlay: \`${autoplay ? 'On' : 'Off'}\``);
  }
};

export default autoplay;