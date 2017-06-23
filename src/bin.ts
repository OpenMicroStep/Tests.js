#!/usr/bin/env node

import {Async} from '@openmicrostep/async';
import {run} from './tests';
import * as path from 'path';

export function pathNormalized(p: string) {
  p = path.normalize(p).replace(/\\/g, '/');
  if (p.endsWith('/'))
    p = p.substring(0, p.length - 1);
  return p;
}


let Module = require('module');
let req = Module.prototype.require;
let test_files = process.argv.filter(a => a.endsWith('.js')).map(a => pathNormalized(a));
process.on('unhandledRejection', (reason, promise) => { throw reason });
Module.prototype.require = function(this: any, modulePath: string) {
    modulePath = pathNormalized(modulePath);
    if (test_files.findIndex(f => modulePath.endsWith(f)) !== -1) {
        let m = req.apply(this, arguments);
        Async.run(null, (f) => run(f, m));
    }
    return req.apply(this, arguments);
}

require('mocha/bin/_mocha');
