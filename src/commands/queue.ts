import { ICommand } from "../interfaces/icommand";

const queue: ICommand = {
    name: 'queue',
    aliases: ['q'],
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message);

        if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
            return await message.channel.send(`There is nothing playing!`);
        }

        const q = queue.songs
            .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
            .join('\n');

        await message.channel.send(`**Server Queue**\n${q}`);
    }
}

export default queue;