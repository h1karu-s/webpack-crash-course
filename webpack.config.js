const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin')
const outputPath =  path.resolve(__dirname,'dist');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename:'main.js',
    path:outputPath
  },
  module:{
    rules:[
      {test: /\.css$/,
      use:[MiniCss.loader,'css-loader']
  },
  {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'url-loader',
        options:{
          limit:2048,
          name:'./image/[name].[ext]'
        }
    },
    { test: /\.jsx?$/,
      exclude: /node_modules/, 
      loader: "babel-loader" },
      {
        test:/\.html$/,
        loader:'html-loader'
      }
    ]
  },
  devServer:{
    contentBase: outputPath
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'./index.html'
    }),
    new MiniCss({
      filename:'[name].[hash].css'
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {drop_console: true}
        }
      })
    ],
  },

}