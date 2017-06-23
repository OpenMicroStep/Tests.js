
module.exports = { name: "my module", tests: [
    { name: "my submodule", tests: [
        function my_test() {},
        { name: "my_2nd_test", test: function my_2nd_test() {} },
        function my_async_test(flux) { flux.continue() },
    ]}
]};
