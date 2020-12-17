/**
 * @file app.js
 */
console.log("Hello Kitty")

setTimeout(() => {
    import("./modules/hello.js")
    .then(mod => console.log(mod.sayHello()))
    .catch(err => console.dir(err))
}, 1000)
