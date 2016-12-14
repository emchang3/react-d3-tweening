const webpack = require('webpack');

module.exports = {
  // configuration
  context: __dirname + "/",
  entry: "./source/main.js",
  output: {
      path: __dirname + "/public/javascripts",
      filename: "main.js"
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [{
     test: /\.js$/,
     exclude: [ /node_modules/ ],
     loaders: [ 'babel-loader' ]
    }]
  }
};
