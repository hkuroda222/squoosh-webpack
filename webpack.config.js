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
      {
        test: /\.(jpe?g|png)/i,
        type: "asset/resource",
        generator: {
          filename: `./images/[name][ext]`,
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        generator: [
          {
            preset: "webp",
            implementation: ImageMinimizerPlugin.squooshGenerate,
            options: {
              encodeOptions: {
                webp: {
                  quality: 80,
                },
              },
            },
          },
        ],
      }),
    ],
  },
};
