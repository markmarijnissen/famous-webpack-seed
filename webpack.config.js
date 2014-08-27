var webpack = require('webpack');
var ReloadPlugin = require('webpack-reload-plugin');
var path = require('path');
var isRunningDevServer = isDevServer();

// Support for extra commandline arguments
var argv = require('optimist')
            //--env=XXX: sets a global ENV variable (i.e. window.ENV="XXX")
            .alias('e','env').default('e','dev')
            //--minify:  minifies output
            .alias('m','minify')
            .argv;

var config = {
  context: path.join(__dirname, "src"),
  entry: getEntries(), // every ./src/**/main.js
  output:{
    path: path.join(__dirname, "dist"),
    filename:"[name]/js/bundle.js",
    publicPath: isRunningDevServer ? '/': ''
  },
  devServer: {
    publicPath: '/'
  },
  reload: isDevServer()? 'localhost': null,
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
      { test: /index\.html$/,       loader: "file-loader?name=[path][name].[ext]" },
      { test: /const(ants)?\.js$/,  loader: "expose?CONST" }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version),
      ENV: JSON.stringify(argv.env)
    }),
    new ReloadPlugin()
  ]
};

if(argv.minify){
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({mangle:false}));
}

/**
 * Search for "/src/xxx/main.js" and return { xxx: './xxx/main' }
 * A root entry can also be supplied with the js bundle being put in assets/js
 * Make sure to set __webpack_public_path__ = "../" in your resource main.js when it is
 *  in a sub directory to setup your relative path (root entries will use the default in this config)
 */
function getEntries(){
  // Get all entry points of our application starting with the root
  // Our bundles will be placed in a relative path ./js
  var apps = require('glob').sync(path.join('./src/**/main.js'));
  var entries = {};
  apps.forEach(function(file){
    // Example file = src/boilerplate/main.js
    var entry = "./" + file.substr(4,file.length-7); // = ./boilerplate/main
    var partsOfFile = file.split('/'); // array of path parts
    var name = '';
    partsOfFile.forEach(function(part){ name += (part !== 'src' && part !== 'main.js') ? (name === '')?  part : '/' + part : ''});
    if (name === '') name = 'assets'; // [optional] setup for a root entry. point to assets/js/bundle.js in index.html
    entries[name] = entry;
  });
  return entries;
}

function isDevServer(){
  return process.argv.join('').indexOf('webpack-dev-server') > -1;
}

module.exports = config;


