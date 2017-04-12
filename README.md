# MSTests for Javascript

This is a very simple javascript testing tool that brings microstep declarative test definition and execution to Javascript.

Install: `npm install @openmicrostep/tests`

Each test module declare a name and either a test function or a list of test modules.
Named function can be directly used as test module.

If a test function takes one parameter, it's considered asynchronous and the first argument will be a _Flux_ as defined in _@openmicrostep/async_ npm module.

Exemple:

```js
module.exports = {
    name: "mytestsuite",
    tests: [
        { name: "my test", test: function() {
            // run mytest
        },
        { name: "my test subs", tests: [ ... ] },
        function direct_named_test() {
            // run direct_named_test
        },
        function direct_async_test(flux) {
            flux.continue();
        }
    ]
}
```

