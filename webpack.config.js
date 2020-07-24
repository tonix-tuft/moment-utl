const webpack = require("webpack");
const libraryName = "moment-utl";
let outputFile;
const library = "MomentUtl";
const srcEntryPoint = "index.js";
const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const env = process.env.WEBPACK_ENV;

if (env === "build") {
  outputFile = libraryName + ".min.js";
} else {
  outputFile = libraryName + ".js";
}

var config = {
  entry: __dirname + "/src/" + srcEntryPoint,
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: outputFile,
    library: library,
    libraryTarget: "umd",
    globalObject:
      "(typeof self !== 'undefined' ? self : (typeof global !== 'undefined' ? global : this))",
    umdNamedDefine: true,
  },
  externals: [
    { moment: "moment" },
    function (context, request, callback) {
      if (/\/moment$/.test(request) && /(^|\/)moment(\/|$)/.test(context)) {
        return callback(null, "moment");
      }
      callback();
    },
  ],
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            {
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-class-properties",
                [
                  "@babel/plugin-transform-runtime",
                  {
                    regenerator: true,
                  },
                ],
              ],
            },
          ],
        },
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
};

if (env === "build") {
  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  };
  config.mode = "production";
  config.devtool = false;
} else {
  config.output.publicPath = "./dist/";
  config.mode = "development";
}

module.exports = config;
