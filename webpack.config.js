const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = function build(env, arg) {
    const config = {
        entry: "./src/index.js",
        output: {
            filename: "main.js",
            path: path.resolve(__dirname, "dist"),
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            port: 3001,
            writeToDisk: true,
        },
        mode: arg.mode,
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\/(ts|js)x$/,
                    exclude: /nodule_modules/,
                    loader: "babel-loader",
                },
                {
                    test: /\.css$/,
                    include: path.resolve(__dirnamem, "public"),
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
                extentions: [".ts", ".js", ".css"],
            },
        },
    };

    return config;
};
