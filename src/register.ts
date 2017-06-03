var glob = require('glob');
require('ts-node/register')

module.exports = function (options?) {
    var controllerGlob = process.cwd() + '/**/*.controller.ts';

    glob.sync(controllerGlob, {
        realpath: true
    }).forEach((path) => {
        if(!path.match('node_modules')){
            require(path);
        }
    });

    if(options && options.run){
        require(process.cwd() + '/' + options.run);
    }
}