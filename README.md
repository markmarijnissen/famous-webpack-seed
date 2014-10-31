#Famous-Webpack-Seed
> A seed project to get started with Webpack and Famo.us. 
> Optional support for Cordova.

###Features

* Your app is split into multiple bundles: `./src/xxxx/main.js` > `./dist/xxxx/bundle.js`
* Require **.jade**, **.coffee** and **.less**
* Support multiple configurations in your code: set `window.ENV` using the `--env` flag.
* Support for **Cordova/Phonegap**

---

### Getting started with Famo.us and webpack

####Installation

```bash
npm install -g webpack webpack-dev-server # install webpack
git clone https://github.com/markmarijnissen/famous-webpack-seed # clone this repository
# rm -rf .git # optionally remove git history
npm install # install dependencies
```

####Development

```bash
webpack-dev-server --reload=localhost
```

Now navigate to:

* [http://localhost:8080/boilerplate/index.html](http://localhost:8080/boilerplate/index.html)
* [http://localhost:8080/webpack-dev-server](http://localhost:8080/webpack-dev-server) (lists all bundles)

The optional `--reload=ip` flag [adds the live-reload snippet](https://github.com/markmarijnissen/webpack-reload-plugin) to your bundle(s).


####Production
```bash
webpack --minify --env=production
```

* The optional `--minify` flag minifies the output.
* The optional `--env=xxx` flag sets a global `ENV` variable (default: `window.TARGET='dev'`).

---

### Getting started with Cordova 

####Installation:

```bash
npm install -g cordova
webpack --cordova # automatically creates a Cordova config.xml
# change app ID in config.xml (optional)
cordova platform add ios # or android
```

[webpack-cordova-plugin](https://github.com/markmarijnissen/webpack-cordova-plugin) is used to add Cordova to your project.

####Development:

```bash
webpack-dev-server --cordova --reload=192.168.0.1 --ios # or --android

# in seperate terminal-tab, launch cordova
cordova run ios # or android
```

* The `--reload` flag enables live reloading, and points Cordova to your **webpack-dev-server**.

* The `--ios` or `--android` flags ensure the correct Cordova and plugin javascript is loaded. The javascript is different for each platform and located at `platform/ios/www` or `platform/android/assets/www`.

####Production:
```bash
webpack --cordova --minify
cordova run ios # or android
```

####Cordova troubleshooting
For more information and troubleshooting see the [webpack-cordova-plugin](https://github.com/markmarijnissen/webpack-cordova-plugin).

---

### Advanced uses

#### Single entry-point

Don't like multiple entry points? Just modify the `config.entry` to point to your single entry point.

That was easy!

#### Extend this config

1. Install `famous-webpack-seed` as npm module.
  ```bash
  npm install famous-webpack-seed --save-dev
  ```

2. Copy these `devDependencies` to your `package.json` and run `npm install`
  ```json
  {
    "coffee-loader": "^0.7.2",
    "coffee-script": "^1.7.1",
    "css-loader": "^0.7.0",
    "expose-loader": "^0.5.3",
    "file-loader": "git://github.com/talves/file-loader.git",
    "glob": "^4.0.5",
    "html-loader": "^0.2.2",
    "jade": "1.2.0",
    "jade-loader": "^0.6.1",
    "json-loader": "^0.5.1",
    "less": "^1.7.4",
    "less-loader": "^0.7.5",
    "optimist": "^0.6.1",
    "script-loader": "^0.6.0",
    "style-loader": "^0.6.4",
    "url-loader": "^0.5.5",
    "webpack": "^1.4.10",
    "webpack-cordova-plugin": "^0.1.3",
    "webpack-dev-server": "^1.6.5",
    "webpack-reload-plugin": "^0.1.1"
  }
  ```

2. A sample `webpack.config.js` to get started:
   ```js
   var config = require('famous-webpack-seed');
   config.context     = __dirname + "/src";
   config.output.path = __dirname + "/dist";
   // modify any other properties of config here...
   module.exports = config;
   ```



## Contributors

Like it? Show some love and star this project!

* Based on the original seed from [Adrian Rossouw](https://github.com/Vertice/famous-webpack-seed)
* Bugfix from [Tony Alves](https://github.com/talves/)
