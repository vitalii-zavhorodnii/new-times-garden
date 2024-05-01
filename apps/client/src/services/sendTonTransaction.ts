import { tonConnectUI } from '@helpers/ton-connect-ui';

import { TON_TO_USD } from '@constants/currency.constants';

export const sendTonTransaction = async (amount: number) => {
  const tonAmount = String(Math.ceil((amount / TON_TO_USD) * 1000000));

  const transaction = {
    validUntil: Math.round(Date.now() / 1000) + 120,
    messages: [
      {
        amount: tonAmount,
        address: process.env.TON_ADDRESS
      }
    ]
  };

  try {
    await tonConnectUI.sendTransaction(transaction);
  } catch (error) {
    console.error(error);
  }
};
