#!/usr/bin/env node

import {Async} from '@microstep/async';
import {run} from './tests';
let Module = require('module');
let req = Module.prototype.require;
let test_files = process.argv.filter(a => a.endsWith('.js'));
process.on('unhandledRejection', (reason, promise) => { throw reason });
Module.prototype.require = function(this: any, path: string) {
    if (test_files.findIndex(f => path.endsWith(f)) !== -1) {
        let m = req.apply(this, arguments);
        Async.run(null, (f) => run(f, m));
    }
    return req.apply(this, arguments);
}

require('mocha/bin/_mocha');
