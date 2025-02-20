const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV === 'production'; // Definimos si estamos en producción o desarrollo

module.exports = {
    entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    mode: isProduction ? 'production' : 'development', // Modo según entorno
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
            os: require.resolve('os-browserify/browser'),
          },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    }, 
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "style-loader", // Cambiar según entorno
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(png|gif|jpg|svg|pdf)$/,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new Dotenv()
    ],
    devServer:{
        port: 80,
        historyApiFallback: true
    }
}
