const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
    ],
  },
  //   optimization: {
  //     minimizer: [
  //       new ImageMinimizerPlugin({
  //         minimizer: {
  //           implementation: ImageMinimizerPlugin.squooshMinify,
  //           filename: "[name][ext]",
  //           options: {
  //             encodeOptions: {
  //               mozjpeg: {
  //                 quality: 80,
  //               },
  //             },
  //           },
  //         },
  //       }),
  //     ],
  //   },
};
