const path = require('path')

module.exports = {
  mode: 'production',
  target: 'electron-main',
  entry: './src/main/index.ts',
  output: {
    path: path.resolve(__dirname, '..', 'app'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader',
      },
    ],
  },  
  node: {
    __dirname: false,
    __filename: false,
  },
}
