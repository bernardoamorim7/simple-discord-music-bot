import { ICommand } from "../interfaces/icommand";

const stop: ICommand = {
    name: 'stop',
    aliases: ['disconnect', 'leave'],
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message);

        if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
            return message.channel.send(` There is nothing in the queue right now!`);
        }

        await queue.stop();

        return message.channel.send(`Stopped!`);
    }
};

export default stop;
