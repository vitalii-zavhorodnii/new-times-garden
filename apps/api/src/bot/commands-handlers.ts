import TelegramBot from 'node-telegram-bot-api';

import { bot } from './bot';

export async function handlePlayGameCommand(msg: TelegramBot.Message) {
  const chatId = msg.chat.id;

  const link = 'https://newtimesgarden.online/';

  bot.sendMessage(chatId, 'play game', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Play',
            web_app: { url: link }
          }
        ]
      ]
    }
  });
}

export async function handleStartBotCommand(msg: TelegramBot.Message) {
  console.log('/start');
  const chatId = msg.chat.id;

  // const webViewLink = `https://newtimesgarden.online?id=${chatId}`;
  // const gameLink = 'ntg';

  // bot.setChatMenuButton({
  //   chat_id: chatId,
  //   menu_button: {
  //     type: 'web_app',
  //     text: 'Play',
  //     web_app: { url: `https://newtimesgarden.online?id=${chatId}` }
  //   }
  // });
}
