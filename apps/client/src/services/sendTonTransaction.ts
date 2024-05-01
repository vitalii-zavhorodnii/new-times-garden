import { tonConnectUI } from '@helpers/ton-connect-ui';

import { TON_TO_USD } from '@constants/currency.constants';

export const sendTonTransaction = async (amount: number) => {
  const i = amount / TON_TO_USD;
  // const x = i * ;
  const y = Math.floor(i);
  console.log({ i });
  // console.log({ x });
  console.log({ n: i + '1000000' });

  const transaction = {
    validUntil: Math.round(Date.now() / 1000) + 120,
    messages: [
      {
        amount: String(y),
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
