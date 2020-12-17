/**
 * @file app.js
 */
console.log("Hello Kitty")
// TODO: move to module
const showSnackbar = (msg) => {
    let x = document.getElementById("snackbar");
    x.innerText = msg
    x.className = "show";
    setTimeout(() => {
        x.className = x.className.replace("show", "");
    }, 3000)
}
// showSnackbar();
setTimeout(() => {
    import("./modules/hello.js")
    .then(mod => console.log(mod.sayHello()))
    .catch(err => console.dir(err))
}, 1000)
