import { ICommand } from "../interfaces/icommand";

const leave: ICommand = {
  name: 'leave',
  inVoiceChannel: true,
  run: async (client, message) => {
    client.distube.voices.leave(message);
  }
};

export default leave;
