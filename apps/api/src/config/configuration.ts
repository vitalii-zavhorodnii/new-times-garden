interface IConfigurationFile {
  app: {
    port: number | undefined;
    jwtsecret: string | undefined;
    initkey: string | undefined;
  };
  database: {
    link: string | undefined;
    username: string | undefined;
    password: string | undefined;
    dbname: string | undefined;
  };
  telegram: {
    token: string;
    link: string;
    manifest_url: string;
    wallets_cache_ms: number;
    send_msg_timeout: number;
  };
  smtp: {
    user: string | undefined;
    password: string | undefined;
    host: string | undefined;
    port: string | undefined;
  };
}

export default (): IConfigurationFile => ({
  app: {
    port: parseInt(process.env.PORT || '3000'),
    jwtsecret: process.env.SECRET,
    initkey: process.env.D_ADMIN_KEY
  },
  database: {
    link: process.env.MONGO_DB_LINK,
    username: process.env.MONGO_DB_AUTH_USERNAME,
    password: process.env.MONGO_DB_AUTH_PASSWORD,
    dbname: process.env.MONGO_DB_NAME
  },
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
    link: process.env.TELEGRAM_BOT_LINK,
    manifest_url: process.env.MANIFEST_URL,
    wallets_cache_ms: parseInt(process.env.WALLETS_LIST_CACHE_TTL_MS || '86400000'),
    send_msg_timeout: parseInt(
      process.env.DELETE_SEND_TX_MESSAGE_TIMEOUT_MS || '600000'
    )
  },
  smtp: {
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    host: process.env.SMTP_DOMAIN,
    port: process.env.SMTP_PORT
  }
});
