/**
 * @file app.js
 */
/*
console.log("Hello Kitty")

setTimeout(() => {
    import("./modules/hello.js")
    .then(mod => console.log(mod.sayHello()))
    .catch(err => console.dir(err))
}, 1000)
*/
const showResults = (data) => {
    let elm = document.getElementById("card_list")
    import("./modules/resultlist.js")
        .then(mod => elm.innerHTML = mod.results(data))
}
// Search for hops
let foo = document.getElementById("search")
foo.addEventListener("submit", (evnt) => {
    evnt.preventDefault();
    let hopName = evnt.target["q"].value.trim();
    // Load data
    import("./modules/search.js")
        .then(mod => mod.search(hopName, showResults))
        .catch(err => console.log("Err: ", err))
})
