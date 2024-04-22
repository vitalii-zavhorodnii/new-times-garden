module.exports = {
  printWidth: 85,
  tabWidth: 2,
  trailingComma: 'none',
  singleQuote: true,
  semi: true,
  importOrder: [
    'phaser',
    '<THIRD_PARTY_MODULES>',
    '@scenes\\w*',
    '@components\\w*',
    '@constants\\w*'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy']
};
