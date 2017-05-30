/// <reference types="express" />
import { Application } from 'express';
import 'reflect-metadata';
export declare function connect(app: Application, controller: any, functionName: string, path: string | RegExp | (string | RegExp), method?: ('get' | 'put' | 'post' | 'delete')): void;
export declare function configure(app: Application): void;
export declare function Controller(): (Controller: any) => void;
export declare function RouteMapping(method: string, path: string | RegExp): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
