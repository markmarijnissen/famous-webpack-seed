var webpack = require('webpack');
var ReloadPlugin = require('webpack-reload-plugin');
var CordovaPlugin = require('webpack-cordova-plugin');
var path = require('path');
var isDevServer = process.argv.join('').indexOf('webpack-dev-server') > -1;

/**
 * Support for extra commandline arguments
 */
var argv = require('optimist')
            //--env=XXX: sets a global ENV variable (i.e. window.ENV="XXX")
            .alias('e','env').default('e','dev')
            //--minify:  minifies output
            .alias('m','minify')
            .argv;

/**
 * Useful variables
 */
var cwd = process.cwd();
var version = require(path.resolve(cwd,'package.json')).version;

/**
 * Webpack configuration
 */
var config = {
  context: path.resolve(cwd, "src"),
  entry: findEntries(),
  output:{
    path: path.resolve(cwd, "dist"),
    filename:"[name]/bundle.js",
    publicPath: isDevServer ? '../': ''
  },
  resolve: {
    alias: {
      'famous':'famous/src'
    }
  },
  devServer: {
    publicPath: '/'
  },
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
    new ReloadPlugin(isDevServer? 'localhost': false)
  ]
};

/**
 * Enable minification
 */
if(argv.minify){
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({mangle:false}));
}

/**
 * Add the Webpack Cordova Plugin
 */
if(argv.cordova){
  config.plugins.push(new CordovaPlugin({
    config: 'config.xml',                     // Location of Cordova' config.xml (will be created if not found)
    src: 'boilerplate/index.html',            // Set entry-point of cordova in config.xml
    version: true,                            // Set config.xml' version. (true = use version from package.json)
  }));
}

/**
 * Helper to find all 'main.js' in subdirectories.
 *
 * Result is for example: { 'boilerplate':'./boilerplate/main' }
 *
 * If you want, you can delete this function and just manually specify 
 * your entry points in `config.entry`.
 */
function findEntries(){
  // mains = [ 'xxxxxx/src/boilerplate/main.js', .... ]
  var mains = require('glob').sync(path.resolve(cwd,'src','**','main.js'));
  var entries = {};
  mains.forEach(function(file){
    // entry = ./boilerplate/main
    var entry = "./" + file.substr(5+cwd.length,file.length-8-cwd.length);
    // name = boilerplate    
    var name = entry.substr(2,entry.length-7) || './';
    // { 'boilerplate': './boilerplate/main' }
    entries[name] = entry;
    
  });
  return entries;
}

module.exports = config;


