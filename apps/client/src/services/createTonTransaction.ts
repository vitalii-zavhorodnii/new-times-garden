import { tonConnectUI } from '../main';

export const transaction = async () => {
  const transaction = {
    validUntil: Math.round(Date.now() / 1000) + 10,
    messages: [
      {
        amount: '1000000',
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
