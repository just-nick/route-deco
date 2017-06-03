#!/usr/bin/env node

var register = require('./register');
var args = process.argv.slice(2);
console.log(args);

register({
    run: args[0]
});