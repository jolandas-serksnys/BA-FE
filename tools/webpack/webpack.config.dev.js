var path = require('path');
var plugins = require('./webpack.plugins');

module.exports = (env) => ({
  mode: 'development',
  entry: ['./src/main.tsx'],
  module: {
    rules: require('./webpack.rules'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },
  plugins: plugins(env),
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      // React Hot Loader Patch
      'react-dom': '@hot-loader/react-dom',
      // Custom Aliases
      ...require('./webpack.aliases'),
    },
  },
  stats: 'errors-warnings',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
    stats: 'errors-warnings',
    hot: true,
    port: 3000,
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
});
