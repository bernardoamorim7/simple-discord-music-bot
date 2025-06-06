import { ICommand } from "../interfaces/icommand";

const pause: ICommand = {
    name: 'pause',
    aliases: ['pause', 'hold'],
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message);

        if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
            return await message.channel.send(`There is nothing in the queue right now!`);
        }

        if (queue.paused) {
            queue.resume();
            return await message.channel.send('Resumed the song for you :)');
        }

        queue.pause();

        return await message.channel.send('Paused the song for you :)');
    }
};

export default pause;