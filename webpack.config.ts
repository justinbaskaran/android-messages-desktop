import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";
import FriendlyErrors from "friendly-errors-webpack-plugin";
import * as process from "process";
import * as path from "path";
import merge from "webpack-merge";

const base: Configuration = {
  target: "electron-renderer",
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  externals: [nodeExternals()],
  devtool: "source-map",
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".css"],
  },
  plugins: [new FriendlyErrors()],
};

const app = merge(base, {
  name: "app",
  entry: {
    background: "./src/background.ts",
    app: "./src/app.ts",
    bridge: "./src/bridge.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "app"),
  },
});

export default [app];
