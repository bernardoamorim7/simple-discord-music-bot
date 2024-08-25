import { ICommand } from "../interfaces/icommand";

const resume: ICommand = {
    name: 'resume',
    aliases: ['resume', 'unpause'],
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message);

        if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
            return await message.channel.send(`There is nothing in the queue right now!`);
        }

        if (queue.paused) {
            queue.resume();
            await message.channel.send('Resumed the song for you :)');
        } else {
            await message.channel.send('The queue is not paused!');
        }
    }
};

export default resume;
