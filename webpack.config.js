var webpack = require('webpack');
var ReloadPlugin = require('webpack-reload-plugin');
var path = require('path');
var isDevServer = process.argv.join('').indexOf('webpack-dev-server') > -1;

// Support for extra commandline arguments
var argv = require('optimist')
            //--env=XXX: sets a global ENV variable (i.e. window.ENV="XXX")
            .alias('e','env').default('e','dev')
            //--minify:  minifies output
            .alias('m','minify')
            .argv;

var cwd = process.cwd();
var version = require(path.resolve(cwd,'package.json')).version;

var config = {
  context: path.resolve(cwd, "src"),
  entry: {
    'boilerplate':'./boilerplate/main.js'
  },
  output:{
    path: path.resolve(cwd, "dist"),
    filename:"[name]/bundle.js",
    publicPath: isDevServer ? '/': ''
  },
  resolve: {
    alias: {
      'famous':'famous/src'
    }
  },
  devServer: {
    publicPath: '/'
  },
  reload: isDevServer? 'localhost': null,
  module:{
    loaders:[
      { test: /\.json$/,            loader: "json-loader" },
      { test: /\.coffee$/,          loader: "coffee-loader" },
      { test: /\.css$/,             loader: "style-loader!css-loader" },
      { test: /\.less$/,            loader: "style-loader!css-loader!less-loader" },
      { test: /\.jade$/,            loader: "jade-loader" },
      { test: /\.(png|jpg|gif)$/,   loader: "url-loader?limit=50000&name=[path][name].[ext]" },
      { test: /\.eot$/,             loader: "file-loader?name=[path][name].[ext]" },
      { test: /\.ttf$/,             loader: "file-loader?name=[path][name].[ext]" },
      { test: /\.svg$/,             loader: "file-loader?name=[path][name].[ext]" },
      { test: /index\.html$/,       loader: "file-loader?name=[path][name].[ext]" }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version),
      ENV: JSON.stringify(argv.env)
    }),
    new ReloadPlugin()
  ]
};

if(argv.minify){
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({mangle:false}));
}

module.exports = config;


