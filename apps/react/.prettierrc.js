module.exports = {
  printWidth: 85,
  tabWidth: 2,
  trailingComma: 'none',
  singleQuote: true,
  semi: true,
  importOrder: [
    '(^react\\w*)|(^phaser/.*?$)|(^@reduxjs\\w*)|(^axios\\w*)|(^@tonconnect/\\w*)',
    '<THIRD_PARTY_MODULES>',
    '(^@scenes\\w*)|(^@game\\w*)',
    '^@entities\\w*',
    '(^@services\\w*)|(^@queries\\w*)',
    '(^@components\\w*)|(^@ui\\w*)',
    '^@mappers\\w*',
    '^@helpers\\w*',
    '^@constants\\w*',
    '^@assets\\w*',
    '(^@interfaces\\w*)|(^@models\\w*)'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
  // importOrderParserPlugins: ['typescript', 'decorators-legacy']
};
