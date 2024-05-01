declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      BACKEND_LINK: string;
      TON_ADDRESS: string;
      MANIFEST_RUL: string;
      DEFAULT_ID: string;
    }
  }
}

export {};
