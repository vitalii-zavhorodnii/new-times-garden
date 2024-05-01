import { tonConnectUI } from '@helpers/ton-connect-ui';

import { TON_TO_USD } from '@constants/currency.constants';

export const sendTonTransaction = async (amount: number) => {
  const i = amount / TON_TO_USD;
  const y = Math.floor(i);
  const x = y * 1000000;
  console.log({ x });

  const transaction = {
    validUntil: Math.round(Date.now() / 1000) + 120,
    messages: [
      {
        amount: String(x),
        address: 'UQDe7GSuj_tYh0_g6RPnO02nJ1PzoIUNYWTkuPIEFvSsOP8u'
      }
    ]
  };

  try {
    await tonConnectUI.sendTransaction(transaction);
  } catch (error) {
    console.error(error);
  }
};
