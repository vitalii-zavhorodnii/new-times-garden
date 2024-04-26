import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import './bot/bot.wallet-menu';
import { walletMenuCallbacks } from './bot/bot.wallet-menu';
import { getConnector } from '@bot/bot.connector';
import { TonConnectStorage } from '@bot/bot.storage';
import { getWalletInfo } from '@bot/bot.wallets';
import { getWallets } from '@bot/bot.wallets';
import { bot } from '@bot/index';
import TonConnect from '@tonconnect/sdk';
import {
  handleConnectCommand,
  handleDisconnectCommand,
  handleSendTXCommand,
  handleShowMyWalletCommand
} from 'bot/commands-handlers';
import { useContainer } from 'class-validator';
// import * as process from 'process';
import * as QRCode from 'qrcode';

import { AppModule } from '@domain/app.module';

import { MongoErrorsFilter } from '@filters/mongo-errors.filter';
import { SwaggerHelper } from '@helpers/swagger.helper';

import { PREFIX, PUBLIC_FOLDER } from '@constants/routes.constants';

console.log({ bot });
/*  Telegram BOT  */
const callbacks = {
  ...walletMenuCallbacks
};

bot.on('callback_query', (query) => {
  if (!query.data) {
    return;
  }

  let request: { method: string; data: string };

  try {
    request = JSON.parse(query.data);
  } catch {
    return;
  }

  if (!callbacks[request.method as keyof typeof callbacks]) {
    return;
  }

  callbacks[request.method as keyof typeof callbacks](query, request.data);
});

bot.onText(/\/connect/, handleConnectCommand);
bot.onText(/\/disconnect/, handleDisconnectCommand);
bot.onText(/\/my_wallet/, handleShowMyWalletCommand);
// bot.onText(/\/connect/, async (msg) => {
//   const chatId = msg.chat.id;
//   const wallets = await getWallets();

//   const connector = getConnector(chatId);

//   connector.onStatusChange(async (wallet) => {
//     if (wallet) {
//       const walletName =
//         (await getWalletInfo(wallet.device.appName))?.name || wallet.device.appName;
//       bot.sendMessage(chatId, `${walletName} wallet connected!`);
//     }
//   });

//   const link = connector.connect(wallets);
//   console.log({ QRCode });
//   const image = await QRCode.toBuffer(link);

//   await bot.sendPhoto(chatId, image, {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           {
//             text: 'Choose a Wallet',
//             callback_data: JSON.stringify({ method: 'chose_wallet' })
//           },
//           {
//             text: 'Open Link',
//             url: `https://ton-connect.github.io/open-tc?connect=${encodeURIComponent(
//               link
//             )}`
//           }
//         ]
//       ]
//     }
//   });
// });

(async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*'
    // methods: 'GET, PUT, POST, PATCH, DELETE, OPTIONS',
    // credentials: true,
    // allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Range'],
    // exposedHeaders: 'Content-Range'
  });

  app.setGlobalPrefix(PREFIX);

  app.useGlobalFilters(new MongoErrorsFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useStaticAssets(`${process.cwd()}/${PUBLIC_FOLDER}`, {
    prefix: `/${PUBLIC_FOLDER}`
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  SwaggerHelper(app);

  await app.listen(process.env.PORT ?? 4000);
})();
