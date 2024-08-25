import { ICommand } from "../interfaces/icommand";

const skip: ICommand = {
    name: 'skip',
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message);

        if (!queue || queue === undefined || queue.songs.length === 0 || !queue.playing) {
            return message.channel.send(`There is nothing in the queue right now!`);
        }

        try {
            const song = await queue.skip();
            await message.channel.send(`Skipped! Now playing:\n${song.name}`);
        } catch (e) {
            await message.channel.send(`${e}`);
        }
    }
};

export default skip;
