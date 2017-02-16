var webpack = require("webpack");

module.exports = {
  entry: {
    "vendor": "./app/vendor",
    "app": "./app/main"
  },
  output: {
    path: __dirname,
    // path : '/',
    filename: "./dist/[name].bundle.js"
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    inline: true,
 },
  module: {
    loaders: [
      {
        test: /\.ts/,
        loaders: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"./dist/vendor.bundle.js"),
    new webpack.HotModuleReplacementPlugin()
  ]
}
