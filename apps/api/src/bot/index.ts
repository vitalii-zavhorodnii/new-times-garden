
import * as TelegramBot from 'node-telegram-bot-api';


const token = '7026453208:AAF_NN3kigpIAtYjwQlumDg5zkjpc_THb74';

export const bot = new TelegramBot(token, { polling: true });
