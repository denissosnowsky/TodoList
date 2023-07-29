const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
      title: 'Production',
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    extensions: [".js", ".ts", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg)$/,
        type: "asset/resource",
      },
    ],
  },
};
