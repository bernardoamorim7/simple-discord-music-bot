import { Message } from 'discord.js';
import { CustomClient } from '../index';

export interface ICommand {
    name: string;
    aliases?: string[];
    inVoiceChannel: boolean;
    run: (client: CustomClient, message: Message, args: string[]) => Promise<any>;
};