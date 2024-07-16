import { readdir } from 'fs';
import { config } from 'dotenv';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { DisTube, Events } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { createBotInfoRectangle } from './utils/bot_info';
import { ICommand } from './interfaces/icommand';
import responses from './responses.json';

// Load environment variables
config();

// Set the bot prefix and token
const BOT_PREFIX: string = process.env.BOT_PREFIX ?? '?';
const BOT_TOKEN: string | undefined = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
   throw new Error('Bot token is not defined!');
}

// Extend the Client class to include commands and aliases
export class CustomClient extends Client {
   public commands: Collection<string, ICommand>;
   public aliases: Collection<string, string>;
   public distube: DisTube;
   
   constructor() {
      super({
         intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.MessageContent
         ],
      });
      this.commands = new Collection();
      this.aliases = new Collection();
      this.distube = new DisTube(this, {
         emitNewSongOnly: true,
         emitAddSongWhenCreatingQueue: false,
         emitAddListWhenCreatingQueue: false,
         plugins: [
            new SpotifyPlugin(),
            new SoundCloudPlugin(),
            new YtDlpPlugin()
         ]
      });
   }
}

// Create a new Discord client using the CustomClient class
const client: CustomClient = new CustomClient();

readdir('./src/commands', (err, files) => {
   if (err) {
      return console.log('Could not find any commands!');
   }

   const tsFiles = files.filter(f => f.split('.').pop() === 'ts');

   if (tsFiles.length <= 0) {
      return console.log('Could not find any commands!');
   }

   tsFiles.forEach(file => {
      file = file.replace('.ts', '.js');

      const cmd: ICommand = require(`./commands/${file}`).default;

      client.commands.set(cmd.name, cmd);

      if (cmd.aliases) {
         cmd.aliases.forEach((alias: string) => client.aliases.set(alias, cmd.name));
      }
   });
});


client.once('ready', () => {
   console.log(createBotInfoRectangle(client));
});

client.on('messageCreate', async message => {
   if (message.author.bot || !message.guild) return;

   if (message.content.startsWith(BOT_PREFIX)) {
      const args: string[] = message.content.slice(BOT_PREFIX.length).trim().split(/ +/g);
      const command: string | undefined = args.shift()?.toLowerCase();
      const cmd: ICommand | undefined = client.commands.get(command as string) || client.commands.get(client.aliases.get(command as string) as string);

      if (!cmd) return;

      if (cmd.inVoiceChannel && !message.member?.voice.channel) {
         return message.channel.send(`You must be in a voice channel!`)
      }

      try {
         cmd.run(client, message, args);
      } catch (error) {
         console.error(error);
         message.channel.send(`Error: \`${error}\``);
      }
   } else {
      responses.responses.forEach(response => {
         const trigger = Array.isArray(response.trigger) ? response.trigger.join(' ') : response.trigger;
         if (message.content.toLowerCase().includes(trigger)) {
            message.channel.send(response.response);
         }
      });
   }
});

const status = (queue: { volume: any; filters: { names: any[]; }; repeatMode: number; autoplay: any; }) =>
   `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
   }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
   .on(Events.PLAY_SONG, (queue, song) =>
      queue.textChannel?.send(
         `Playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
      )
   )
   .on(Events.ADD_SONG, (queue, song) =>
      queue.textChannel?.send(
         `Added ${song.name} - \`${song.formattedDuration}\` to the queue`
      )
   )
   .on(Events.ADD_LIST, (queue, playlist) =>
      queue.textChannel?.send(
         `Added \`${playlist.name}\` playlist (${playlist.songs.length
         } songs) to queue\n${status(queue)}`
      )
   )
   .on(Events.FINISH, (queue) =>
      queue.textChannel?.send('Finished!')
   )
   .on(Events.DISCONNECT, (queue) =>
      queue.textChannel?.send('Disconnected!')
   )
   .on(Events.ERROR, (error) => {
      console.error(error);
   });

client.login(BOT_TOKEN);