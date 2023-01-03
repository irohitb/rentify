module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'module:react-native-dotenv',

    require.resolve('babel-plugin-module-resolver'),
    {
      cwd: 'babelrc',
      extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
      alias: {
        '@rider': './src/rider',
        '@driver': './src/driver',
        '@components': './src/components',
        '@services': './src/services',
        '@src': './src',
      },
    },
  ],
};
