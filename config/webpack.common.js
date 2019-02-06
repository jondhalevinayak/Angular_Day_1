const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const paths = require('./paths');

module.exports = function (env) {
    const isEnvDevelopment = env === 'dev';
    const isEnvProduction = env === 'prod';

    return {
        entry: {
            'polyfills': './polyfills.ts',
            'vendor': './vendor.ts',
            'app': './src/main.ts',
        },

        resolve: {
            extensions: ['.js', '.ts']
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        {
                            loader: 'awesome-typescript-loader',
                            options: { configFileName: './tsconfig.json' }
                        }, 'angular2-template-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: {
                                minimize: true,
                                caseSensitive: true,
                                removeAttributeQuotes: false
                            }
                        }
                    ]
                },
                {
                    test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                    parser: { system: true }
                },
                {
                    test: /\.(css)$/,
                    use: [
                        isEnvDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|bmp|gif|jpe?g|png)$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: `${paths.outputMediaPath}[name].[ext]`
                    }
                },
                {
                    test: /\.(ico)$/,
                    use: "file-loader?name=[name].[ext]"
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",   // Input FileName
                filename: "./index.html"    // Output FileName
            }),
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core/,
                path.resolve(__dirname)
            ),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
            isEnvProduction && new MiniCssExtractPlugin({
                filename: `${paths.outputCSSPath}[name].[hash].css`,
                chunkFilename: `${paths.outputCSSPath}[name].[hash].chunk.css`
            })
        ].filter(Boolean),

        optimization: {
            splitChunks: {
                chunks: "all"
            }
        }
    };
}