const path = require('path');
//const CleanWebpackPlugin = require('clean-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
//const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  //devtool: 'source-map',

  entry: __dirname + "/src/login/index.js",
  output: {
    filename: "[name].bundle.js",
  },
 
  module: {  // where we defined file patterns and their loaders
      rules: [
        {
          // For pure CSS (without CSS modules)
          test: /\.css$/i,
          exclude: /\.module\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          // For CSS modules
          test: /\.module\.css$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        }, 
      ]
  },
  
  plugins: [  // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin(), 
  ],
  
  devServer: {  // configuration for webpack-dev-server
      contentBase: './src',  //source of static assets
      port: 8080, // port to run dev-server
  } 
};
