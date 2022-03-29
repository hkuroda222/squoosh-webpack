const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./src/index.js"],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
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

  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    //     new ImageMinimizerPlugin({
    //       generator: [
    //         {
    //           preset: "webp",
    //           implementation: ImageMinimizerPlugin.squooshGenerate,
    //           options: {
    //             encodeOptions: {
    //               webp: {
    //                 quality: 70,
    //               },
    //             },
    //           },
    //         },
    //       ],
    //     }),
  ],
};
