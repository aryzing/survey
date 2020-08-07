const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const express = require("express");
const mockSurvey = require("./__files__/survey.json");
const mockFilterDefinition = require("./__files__/filter-definition.json");

module.exports = {
  entry: path.join(__dirname, "src", "main"),

  mode: "development",

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    setup(app) {
      app.use("/assets", express.static("__files__"));

      app.get("/api/survey", (_, res) => res.json(mockSurvey));
      app.get("/api/filter-definition", (_, res) =>
        res.json(mockFilterDefinition)
      );
    },
  },

  // Default output configuration
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[name].js",
    globalObject: "this",
  },

  // Webpack performance options
  performance: {
    hints: false,
    maxEntrypointSize: 320000,
  },

  // Resolving strategies for files
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: [
      path.join(__dirname, "src"),
      path.join(__dirname, "node_modules"),
    ],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // Defualt loaders for most targets
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: [path.join(__dirname, "node_modules")],
        use: [
          {
            loader: "babel-loader",
            options: {
              envName: "client",
            },
          },
        ],
      },
      {
        test: /\.(css|postcss)$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(less)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.(styl|stylus)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "stylus-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "template.html"),
    }),
  ],
};
