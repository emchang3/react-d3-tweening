const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // configuration
    context: __dirname + "/",
    entry: "./source/main.js",
    output: {
        path: __dirname + "/public/javascripts",
        filename: "main.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJSPlugin()
        // new webpack.optimize.DedupePlugin()
    ],
    mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            }
        }]
    }
};
