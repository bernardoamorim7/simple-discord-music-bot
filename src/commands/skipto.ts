import { ICommand } from "../interfaces/icommand";

const skipto: ICommand = {
  name: 'skipto',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);

    if (!queue) {
      return message.channel.send(`There is nothing in the queue right now!`);
    }

    if (!args[0]) {
      return message.channel.send(`Please provide time (in seconds) to go rewind!`);
    }

    const num: number = Number(args[0]);

    if (isNaN(num)) {
      return message.channel.send(`Please enter a valid number!`);
    }

    await client.distube.jump(message, num).then(song => {
      message.channel.send({ content: `Skipped to: ${song.name}` });
    });
  }
};

export default skipto;