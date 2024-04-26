import {
  WalletInfoRemote,
  encodeTelegramUrlParameters,
  isTelegramUrl
} from '@tonconnect/sdk';
import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { CallbackQuery } from 'node-telegram-bot-api';

import { getConnector } from './bot.connector';
import { getWalletInfo, getWallets } from './bot.wallets';
import { editQR } from '@bot/bot.wallet-menu';
import { bot } from 'bot';

export const AT_WALLET_APP_NAME = 'telegram-wallet';

export const pTimeoutException = Symbol();

export function pTimeout<T>(
  promise: Promise<T>,
  time: number,
  exception: unknown = pTimeoutException
): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  return Promise.race([
    promise,
    new Promise((_r, rej) => (timer = setTimeout(rej, time, exception)))
  ]).finally(() => clearTimeout(timer)) as Promise<T>;
}

export function addTGReturnStrategy(link: string, strategy: string): string {
  const parsed = new URL(link);
  parsed.searchParams.append('ret', strategy);
  link = parsed.toString();

  const lastParam = link.slice(link.lastIndexOf('&') + 1);
  return (
    link.slice(0, link.lastIndexOf('&')) +
    '-' +
    encodeTelegramUrlParameters(lastParam)
  );
}

export function convertDeeplinkToUniversalLink(
  link: string,
  walletUniversalLink: string
): string {
  const search = new URL(link).search;
  const url = new URL(walletUniversalLink);

  if (isTelegramUrl(walletUniversalLink)) {
    const startattach = 'tonconnect-' + encodeTelegramUrlParameters(search.slice(1));
    url.searchParams.append('startattach', startattach);
  } else {
    url.search = search;
  }

  return url.toString();
}

export async function buildUniversalKeyboard(
  link: string,
  wallets: WalletInfoRemote[]
): Promise<InlineKeyboardButton[]> {
  const atWallet = wallets.find(
    (wallet) => wallet.appName.toLowerCase() === AT_WALLET_APP_NAME
  );
  const atWalletLink = atWallet
    ? addTGReturnStrategy(
        convertDeeplinkToUniversalLink(link, atWallet?.universalLink),
        process.env.TELEGRAM_BOT_LINK!
      )
    : undefined;

  const keyboard = [
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
  ];

  if (atWalletLink) {
    keyboard.unshift({
      text: '@wallet',
      url: atWalletLink
    });
  }

  return keyboard;
}

async function onOpenUniversalQRClick(
  query: CallbackQuery,
  _: string
): Promise<void> {
  const chatId = query.message!.chat.id;
  const wallets = await getWallets();

  const connector = getConnector(chatId);

  const link = connector.connect(wallets);

  await editQR(query.message!, link);

  const keyboard = await buildUniversalKeyboard(link, wallets);

  await bot.editMessageReplyMarkup(
    {
      inline_keyboard: [keyboard]
    },
    {
      message_id: query.message?.message_id,
      chat_id: query.message?.chat.id
    }
  );
}
