import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { useContainer } from 'class-validator';



import { AppModule } from '@domain/app.module';

import { MongoErrorsFilter } from '@filters/mongo-errors.filter';
import { SwaggerHelper } from '@helpers/swagger.helper';

import { PREFIX, PUBLIC_FOLDER } from '@constants/routes.constants';

import TonConnect from '@tonconnect/sdk';
import { bot } from '@bot/bot';
import { getWallets,getWalletInfo } from '@bot/ton-connect/wallets';
import { TonConnectStorage } from '@bot/ton-connect/storage';
import { getConnector } from '@bot/ton-connect/connector';
import * as QRCode from 'qrcode';
import '@bot/connect-wallet-menu';


bot.onText(/\/connect/, async msg => {
  const chatId = msg.chat.id;
  const wallets = await getWallets();

  const connector = getConnector(chatId);

  connector.onStatusChange(async wallet => {
      if (wallet) {
          const walletName =
              (await getWalletInfo(wallet.device.appName))?.name || wallet.device.appName;
          bot.sendMessage(chatId, `${walletName} wallet connected!`);
      }
  });

  const link = connector.connect(wallets);
  const image = await QRCode.toBuffer(link);

  await bot.sendPhoto(chatId, image, {
      reply_markup: {
          inline_keyboard: [
              [
                  {
                      text: 'Choose a Wallet',
                      callback_data: JSON.stringify({ method: 'chose_wallet' })
                  },
                  {
                      text: 'Open Link',
                      url: `https://ton-connect.github.io/open-tc?connect=${encodeURIComponent(
                          link
                      )}`
                  }
              ]
          ]
      }
  });
});

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
