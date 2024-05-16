module.exports = {
  printWidth: 85,
  tabWidth: 2,
  trailingComma: 'none',
  singleQuote: true,
  semi: true,
  importOrder: [
    '(^phaser/.*?$)|(^axios\\w*)|(^@tonconnect/\\w*)(^lit\\w*)',
    '<THIRD_PARTY_MODULES>',
    '^@emitter\\w*',
    '^@services\\w*',
    '^@scenes\\w*',
    '(^@components\\w*)|(^@ui\\w*)|(^./styles\\w*)',
    '^@entities\\w*',
    '^@mappers\\w*',
    '^@helpers\\w*',
    '^@constants\\w*',
    '^@interfaces\\w*'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy']
};
