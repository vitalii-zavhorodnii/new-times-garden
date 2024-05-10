module.exports = {
  printWidth: 85,
  tabWidth: 2,
  trailingComma: 'none',
  singleQuote: true,
  semi: true,
  importOrder: [
    '(^react/\\w*)|(^phaser/.*?$)|(^axios\\w*)|(^@tonconnect/\\w*)',
    '<THIRD_PARTY_MODULES>',
    '^@services\\w*',
    '^@scenes\\w*',
    '(^@components\\w*)|(^@ui\\w*)',
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
