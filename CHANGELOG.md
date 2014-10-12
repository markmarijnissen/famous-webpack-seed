# Changelog

### 0.8.0 (12/10/2014)

* set famo.us alias to avoid referencing the `src` folder.
* removed the entry-point example at `src` level.

### 0.7.0 (09/10/2014)

* update to latest `Famous/famous` version release `0.3.0`
* allows for the 0.3.0 release changes of `src` path

### 0.6.2 (06/08/2014)

* update to latest `webpack-dev-server` fixes issues with `publicPath`
* and allows you to set `--content-base` with the config file!

### 0.6.1 (05/08/2014)

* publish famous-webpack-seed to NPM. This makes it easier to `require` and extend the `webpack.config.js` and follow upstream changes.

### 0.6.0 (05/08/2014) Major refactor

* simplified README
* changed `--sync` to `--reload` and moved code to webpack plugin: `webpack-reload-plugin`
* created seperate `webpack.cordova.js` and moved code to webpack plugin: `webpack-cordova-plugin`
* removed cordova `www` directory, `plugins` directory and `config.xml`. They are automatically created when needed.
* removed `--bundle` options (just modify your `entry` in config if you want to change this)
* changed `--target` option to `--env` (target was already used as argument)

### 0.5.0 (04/08/2014)

* renamed `--app` flag to `--bundle`
* added changelog

### 0.4.0 (04/08/2014)

* use `copy-loader` and `copy-url-loader` to create independent bundles.