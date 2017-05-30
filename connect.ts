import {Application} from 'express';
import 'reflect-metadata';

let controllers: Array<typeof Function> = [];

export function connect(
    app: Application, 
    controller: any, 
    functionName: string, 
    path: string | RegExp | (string | RegExp), 
    method: ('get'|'put'|'post'|'delete') = 'get')
{
    app[method](path, (req, res, next) => {
        controller[functionName](req, res, next);
    })
}

export function configure(app: Application){
    console.log('Setup Controllers...');
    for(let Controller of controllers) {
        console.log('  ', Controller.name);
        let controller = new Controller();//Injector().get(Controller);

        for(let method of Object.getOwnPropertyNames(Controller.prototype)){
            let binding = Reflect.getMetadata('route-deco:mapping', Controller.prototype, method);

            if(binding){
                console.log('   ', Controller.name + '.' + method, 'bound to', binding.method, '::', binding.path);
                connect(app, controller, method, binding.path, binding.method);
            }
        }
    }
}

export function Controller(){
    return function(Controller: typeof Function | any){
        // for(let method of Object.getOwnPropertyNames(Controller.prototype)){
        //     let binding = Reflect.getMetadata('route-deco:mapping', Controller.prototype, method);

        //     if(binding){
        //         console.log('   ', Controller.name + '.' + method, 'bound to', binding.method, '::', binding.path);
        //     }
        // }

        controllers.push(Controller);
    }
}

export function RouteMapping(method: string, path: string | RegExp) {
    return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        Reflect.defineMetadata('route-deco:mapping', {method, path}, target, propertyKey)
    }
}