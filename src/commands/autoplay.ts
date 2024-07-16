import { ICommand } from "../interfaces/icommand";

const autoplay: ICommand = {
  name: 'autoplay',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue) {
      return message.channel.send(`${client.emojis} | There is nothing in the queue right now!`);
    }

    const autoplay = queue.toggleAutoplay();

    message.channel.send(`AutoPlay: \`${autoplay ? 'On' : 'Off'}\``);
  }
};

export default autoplay;