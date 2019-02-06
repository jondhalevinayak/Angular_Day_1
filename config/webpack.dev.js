const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = function (env) {
    return webpackMerge(commonConfig(env), {
        mode: 'development',

        devtool: 'cheap-module-eval-source-map',

        output: {
            publicPath: 'http://localhost:3000/',
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },

        devServer: {
            inline: true,
            port: 3000,
            historyApiFallback: true,
            clientLogLevel: 'none',
            stats: 'minimal',
            open: 'Chrome'
        }
    });
}