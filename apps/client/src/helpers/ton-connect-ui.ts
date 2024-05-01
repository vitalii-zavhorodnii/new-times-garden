import { TonConnectUI } from '@tonconnect/ui';

export const tonConnectUI = new TonConnectUI({
  manifestUrl: process.env.MANIFEST_URL,
  buttonRootId: 'ton-connect'
});
