import { ICommand } from "../interfaces/icommand";

const coinflip: ICommand = {
  name: 'coinflip',
  inVoiceChannel: true,
  run: async (client, message) => {
    let coin: Number = Math.round(Math.random()) + 1;
    
    await message.channel.send(`The result of the coinflip is... **${coin === 1 ? 'Heads' : 'Tails'}**!`);
  }
};

export default coinflip;
