module.exports = {
  printWidth: 85,
  tabWidth: 2,
  trailingComma: 'none',
  singleQuote: true,
  semi: true,
  importOrder: [
    '(^phaser/.*?$)|(^axios\\w*)',
    '<THIRD_PARTY_MODULES>',
    '^@services\\w*',
    '^@scenes\\w*',
    '^@components\\w*',
    '^@entities\\w*',
    '^@mappers\\w*',
    '^@constants\\w*'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy']
};
