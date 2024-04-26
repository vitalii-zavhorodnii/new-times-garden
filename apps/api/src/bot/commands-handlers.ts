import {
  CHAIN,
  UserRejectsError,
  isTelegramUrl,
  isWalletInfoRemote,
  toUserFriendlyAddress
} from '@tonconnect/sdk';
import type TelegramBot from 'node-telegram-bot-api';

import { getConnector } from './bot.connector';
import {
  addTGReturnStrategy,
  buildUniversalKeyboard,
  pTimeout,
  pTimeoutException
} from './bot.utils';
import { getWalletInfo, getWallets } from './bot.wallets';
import { bot } from './index';
import * as QRCode from 'qrcode';

const newConnectRequestListenersMap = new Map<number, () => void>();

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

// export async function handleConnectCommand(msg: TelegramBot.Message): Promise<void> {
//   const chatId = msg.chat.id;
//   const wallets = await getWallets();

//   const connector = getConnector(chatId);

//   connector.onStatusChange((wallet) => {
//     if (wallet) {
//       bot.sendMessage(chatId, `${wallet.device.appName} wallet connected!`);
//     }
//   });

//   const link = connector.connect(wallets);
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

//   pTimeout(
//     connector.sendTransaction({
//       validUntil: Math.round(
//         (Date.now() + Number(process.env.DELETE_SEND_TX_MESSAGE_TIMEOUT_MS)) / 1000
//       ),
//       messages: [
//         {
//           amount: '1000000',
//           address:
//             '0:0000000000000000000000000000000000000000000000000000000000000000'
//         }
//       ]
//     }),
//     Number(process.env.DELETE_SEND_TX_MESSAGE_TIMEOUT_MS)
//   )
//     .then(() => {
//       bot.sendMessage(chatId, `Transaction sent successfully`);
//     })
//     .catch((e) => {
//       if (e === pTimeoutException) {
//         bot.sendMessage(chatId, `Transaction was not confirmed`);
//         return;
//       }

//       if (e instanceof UserRejectsError) {
//         bot.sendMessage(chatId, `You rejected the transaction`);
//         return;
//       }

//       bot.sendMessage(chatId, `Unknown error happened`);
//     })
//     .finally(() => connector.pauseConnection());
// }

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

  console.log({ walletInfo });

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
