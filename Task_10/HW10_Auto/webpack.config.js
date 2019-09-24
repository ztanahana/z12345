const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin

module.exports = {
  entry: __dirname + "/src/index.js", // webpack entry point. Module to start building dependency graph
  
output: {
    path: __dirname + '/dist', // Folder to store generated bundle
    filename: 'bundle.js',  // Name of generated bundle after build
    publicPath: '/' // public URL of the output directory when referenced in a browser
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
      new HtmlWebpackPlugin({
          template: __dirname + "/src/index.html",
          inject: 'body'
      })
  ],
  
devServer: {  // configuration for webpack-dev-server
      contentBase: './src',  //source of static assets
      port: 8080, // port to run dev-server
  } 
};
