import { CHAIN, UserRejectsError, toUserFriendlyAddress } from '@tonconnect/sdk';
import { isTelegramUrl } from '@tonconnect/sdk';
import TelegramBot from 'node-telegram-bot-api';

import { bot } from './bot';
import { getConnector } from './ton-connect/connector';
import { getWalletInfo, getWallets } from './ton-connect/wallets';
import { pTimeout, pTimeoutException } from './utils';
import { buildUniversalKeyboard } from './utils';
import { addTGReturnStrategy } from './utils';
import * as QRCode from 'qrcode';

let newConnectRequestListenersMap = new Map<number, () => void>();

export async function handleConnectCommand(msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  let messageWasDeleted = false;

  newConnectRequestListenersMap.get(chatId)?.();

  const connector = getConnector(chatId, () => {
    unsubscribe();
    newConnectRequestListenersMap.delete(chatId);
    deleteMessage();
  });

  await connector.restoreConnection();
  if (connector.connected) {
    const connectedName =
      (await getWalletInfo(connector.wallet!.device.appName))?.name ||
      connector.wallet!.device.appName;
    await bot.sendMessage(
      chatId,
      `You have already connect ${connectedName} wallet\nYour address: ${toUserFriendlyAddress(
        connector.wallet!.account.address,
        connector.wallet!.account.chain === CHAIN.TESTNET
      )}\n\n Disconnect wallet firstly to connect a new one`
    );

    return;
  }

  const unsubscribe = connector.onStatusChange(async (wallet) => {
    if (wallet) {
      await deleteMessage();

      const walletName =
        (await getWalletInfo(wallet.device.appName))?.name || wallet.device.appName;
      await bot.sendMessage(chatId, `${walletName} wallet connected successfully`);
      unsubscribe();
      newConnectRequestListenersMap.delete(chatId);
    }
  });

  const wallets = await getWallets();

  const link = connector.connect(wallets);
  const image = await QRCode.toBuffer(link);

  const keyboard = await buildUniversalKeyboard(link, wallets);

  const botMessage = await bot.sendPhoto(chatId, image, {
    reply_markup: {
      inline_keyboard: [keyboard]
    }
  });

  const deleteMessage = async (): Promise<void> => {
    if (!messageWasDeleted) {
      messageWasDeleted = true;
      await bot.deleteMessage(chatId, botMessage.message_id);
    }
  };

  newConnectRequestListenersMap.set(chatId, async () => {
    unsubscribe();

    await deleteMessage();

    newConnectRequestListenersMap.delete(chatId);
  });
}

export async function handleSendTXCommand(msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;

  const connector = getConnector(chatId);

  await connector.restoreConnection();
  if (!connector.connected) {
    await bot.sendMessage(chatId, 'Connect wallet to send transaction');
    return;
  }

  pTimeout(
    connector.sendTransaction({
      validUntil: Math.round(
        (Date.now() + Number(process.env.DELETE_SEND_TX_MESSAGE_TIMEOUT_MS)) / 1000
      ),
      messages: [
        {
          amount: '1',
          address:
            '0:0000000000000000000000000000000000000000000000000000000000000000'
        }
      ]
    }),
    Number(process.env.DELETE_SEND_TX_MESSAGE_TIMEOUT_MS)
  )
    .then(() => {
      bot.sendMessage(chatId, `Transaction sent successfully`);
    })
    .catch((e) => {
      if (e === pTimeoutException) {
        bot.sendMessage(chatId, `Transaction was not confirmed`);
        return;
      }

      if (e instanceof UserRejectsError) {
        bot.sendMessage(chatId, `You rejected the transaction`);
        return;
      }

      bot.sendMessage(chatId, `Unknown error happened`);
    })
    .finally(() => connector.pauseConnection());

  let deeplink = '';
  const walletInfo: any = await getWalletInfo(connector.wallet!.device.appName);
  if (walletInfo) {
    deeplink = walletInfo.universalLink;
  }

  if (isTelegramUrl(deeplink)) {
    const url = new URL(deeplink);
    url.searchParams.append('startattach', 'tonconnect');
    deeplink = addTGReturnStrategy(url.toString(), process.env.TELEGRAM_BOT_LINK!);
  }

  await bot.sendMessage(
    chatId,
    `Open ${
      walletInfo?.name || connector.wallet!.device.appName
    } and confirm transaction`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `Open ${walletInfo?.name || connector.wallet!.device.appName}`,
              url: deeplink
            }
          ]
        ]
      }
    }
  );
}

export async function sendTxById(id: number): Promise<void> {
  const chatId = id;

  const connector = getConnector(chatId);

  await connector.restoreConnection();
  if (!connector.connected) {
    await bot.sendMessage(chatId, 'Connect wallet to send transaction');
    return;
  }

  pTimeout(
    connector.sendTransaction({
      validUntil: Math.round(
        (Date.now() + Number(process.env.DELETE_SEND_TX_MESSAGE_TIMEOUT_MS)) / 1000
      ),
      messages: [
        {
          amount: '1000000',
          address:
            '0:0000000000000000000000000000000000000000000000000000000000000000'
        }
      ]
    }),
    Number(process.env.DELETE_SEND_TX_MESSAGE_TIMEOUT_MS)
  )
    .then(() => {
      bot.sendMessage(chatId, `Transaction sent successfully`);
    })
    .catch((e) => {
      if (e === pTimeoutException) {
        bot.sendMessage(chatId, `Transaction was not confirmed`);
        return;
      }

      if (e instanceof UserRejectsError) {
        bot.sendMessage(chatId, `You rejected the transaction`);
        return;
      }

      bot.sendMessage(chatId, `Unknown error happened`);
    })
    .finally(() => connector.pauseConnection());

  let deeplink = '';
  const walletInfo: any = await getWalletInfo(connector.wallet!.device.appName);
  if (walletInfo) {
    deeplink = walletInfo.universalLink;
  }

  if (isTelegramUrl(deeplink)) {
    const url = new URL(deeplink);
    url.searchParams.append('startattach', 'tonconnect');
    deeplink = addTGReturnStrategy(url.toString(), process.env.TELEGRAM_BOT_LINK!);
  }

  await bot.sendMessage(
    chatId,
    `Open ${
      walletInfo?.name || connector.wallet!.device.appName
    } and confirm transaction`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `Open ${walletInfo?.name || connector.wallet!.device.appName}`,
              url: deeplink
            }
          ]
        ]
      }
    }
  );
}

export async function handleDisconnectCommand(
  msg: TelegramBot.Message
): Promise<void> {
  const chatId = msg.chat.id;

  const connector = getConnector(chatId);

  await connector.restoreConnection();
  if (!connector.connected) {
    await bot.sendMessage(chatId, "You didn't connect a wallet");
    return;
  }

  await connector.disconnect();

  await bot.sendMessage(chatId, 'Wallet has been disconnected');
}

export async function handleShowMyWalletCommand(
  msg: TelegramBot.Message
): Promise<void> {
  console.log('id', msg.chat.id);
  const chatId = msg.chat.id;

  const connector = getConnector(chatId);

  await connector.restoreConnection();
  if (!connector.connected) {
    await bot.sendMessage(chatId, "You didn't connect a wallet");
    return;
  }

  const walletName =
    (await getWalletInfo(connector.wallet!.device.appName))?.name ||
    connector.wallet!.device.appName;

  await bot.sendMessage(
    chatId,
    `Connected wallet: ${walletName}\nYour address: ${toUserFriendlyAddress(
      connector.wallet!.account.address,
      connector.wallet!.account.chain === CHAIN.TESTNET
    )}`
  );
}

export async function handlePlayGameCommand(msg: TelegramBot.Message) {
  const chatId = msg.chat.id;

  const gameLink = 'ntg';
  const link = 'https://newtimesgarden.online/';
  // bot.answerCallbackQuery(String(chatId), { url: gameLink });
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

  // bot.sendGame(chatId, gameLink);
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
