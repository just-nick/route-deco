"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auto_injecty_1 = require("auto-injecty");
require("reflect-metadata");
let controllers = [];
function connect(app, controller, functionName, path, method = 'get') {
    app[method](path, (req, res, next) => {
        controller[functionName](req, res, next);
    });
}
exports.connect = connect;
function configure(app) {
    console.log('Setup Controllers...');
    for (let Controller of controllers) {
        console.log('  ', Controller.name);
        let controller = auto_injecty_1.Injector.get(Controller);
        for (let method of Object.getOwnPropertyNames(Controller.prototype)) {
            let binding = Reflect.getMetadata('route-deco:mapping', Controller.prototype, method);
            if (binding) {
                console.log('   ', Controller.name + '.' + method, 'bound to', binding.method, '::', binding.path);
                connect(app, controller, method, binding.path, binding.method);
            }
        }
    }
}
exports.configure = configure;
function Controller() {
    return function (Controller) {
        // for(let method of Object.getOwnPropertyNames(Controller.prototype)){
        //     let binding = Reflect.getMetadata('route-deco:mapping', Controller.prototype, method);
        //     if(binding){
        //         console.log('   ', Controller.name + '.' + method, 'bound to', binding.method, '::', binding.path);
        //     }
        // }
        controllers.push(Controller);
    };
}
exports.Controller = Controller;
function RouteMapping(method, path) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('route-deco:mapping', { method, path }, target, propertyKey);
    };
}
exports.RouteMapping = RouteMapping;
//# sourceMappingURL=connect.js.map