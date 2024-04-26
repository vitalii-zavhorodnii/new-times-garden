import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private token: string;
  public bot: TelegramBot;

  constructor(private readonly configService: ConfigService) {
    this.token = configService.get<string>('telegram.token');
  }

  public init(): void {
    this.bot = new TelegramBot(this.token, { polling: true });

    console.log({ bot: this.bot, token: this.token });

    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id;

      this.bot.sendMessage(chatId, 'Received your message');
    });
  }
}
