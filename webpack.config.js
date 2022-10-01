const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = {
    entry: [
        "./src/Tile.ts",
        "./src/brain.ts",
        "./src/heart.ts",
        "./src/limbs.ts",
    ],
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        compress: true,
        port: 3001,
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\/(ts|js)x$/,
                exclude: /nodule_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                    {
                        loader: "ts-loader",
                    },
                ],
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "public"),
                exclude: /nodule_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
            chunkFilename: "[id].css",
        }),

        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
        }),
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, "/src"),
            path.resolve(__dirname, "/public"),
            path.resolve(__dirname, "node_modules/"),
        ],
        extensions: [".ts", ".js", ".css"],
    },
};
