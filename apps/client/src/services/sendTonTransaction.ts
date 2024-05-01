import { tonConnectUI } from '@helpers/ton-connect-ui';

export const sendTonTransaction = async (amount: number) => {
  const transaction = {
    validUntil: Math.round(Date.now() / 1000) + 10,
    messages: [
      {
        amount: String(amount),
        address: '0:0000000000000000000000000000000000000000000000000000000000000000'
      }
    ]
  };

  try {
    await tonConnectUI.sendTransaction(transaction);
  } catch (error) {
    console.error(error);
  }
};
