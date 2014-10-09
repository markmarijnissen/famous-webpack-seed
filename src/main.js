define(function(require, exports, module) {
    // load non-js resources (css, index.html)
    require('./resources');

    // import dependencies
    var Engine = require('famous/src/core/Engine');
    var Modifier = require('famous/src/core/Modifier');
    var Transform = require('famous/src/core/Transform');
    var ImageSurface = require('famous/src/surfaces/ImageSurface');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var logo = new ImageSurface({
        size: [200, 200],
        content: require('./images/famous_logo.svg'),
        classes: ['double-sided']
    });

    var initialTime = Date.now();
    var centerSpinModifier = new Modifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        transform : function(){
            return Transform.rotateY(0.002 * (Date.now() - initialTime));
        }
    });

    mainContext.add(centerSpinModifier).add(logo);

    /**
     * Support for multiple configurations using the global ENV variable.
     *
     * Set the variable in webpack.config.js, or with the --env=XXXX flag.
     */
    if(ENV === "production") {
        console.log("Hooray! This is the production environment. You can use different settings!");
    } else {
        console.log("You're running in the "+ENV+" environment. Try \"webpack --env=production\".");
    }

    /**
     * Support for Cordova
     */
    document.addEventListener("deviceready", function(){
        // Add the cordova.js script tag to your HTML to load cordova.
        //
        //  <script type="text/javascript" src="cordova.js"></script>
        console.log('Cordova loaded succesfully - Device Ready!');
    }, false);
});
