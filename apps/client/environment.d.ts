declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'dev' | 'prod';
      BACKEND_LINK: string;
    }
  }
}

export {};
