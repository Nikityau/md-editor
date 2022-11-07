const path = require('path')

const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const exclude_var = /node_modules/

const srcPath = path.resolve(__dirname, 'src')

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
           // ЕБАЛ В РОТ, НИХУЯ НЕ РАБОТАЕТ
        },
    },
    output: {
        filename: "[name].[contenthash].bundle.js",
        assetModuleFilename: "assets/[name][ext]",
        sourceMapFilename: "[name].js.map",
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        clean: true
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin()
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'src')
        },
        historyApiFallback: true,
        compress: false,
        port: 8080,
        open: true,
        hot: true,
        client: {
            reconnect: true
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            minify: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].bundle.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.s[ac]ss$/,
                exclude: exclude_var,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','sass-loader']
            },
            {
                test: /\.[cm]js?x?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: exclude_var,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?/,
                include: path.resolve(__dirname, 'src'),
                exclude: exclude_var,
                use: ['babel-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource'
            },
        ]
    }
}