/**
 * @file app.js
 */

import Search from "./modules/search.js";
import Card from "./modules/card.js";
import Context from "./modules/context.js";

let ctx = new Context();

let card = document.querySelector("x-card")
ctx.subscribe({
    event: "__search__",
    action: (payload) => {
        card.updateState(payload)
        card.setAttribute("visible", "true")
    }
})

let foo = document.querySelector("x-search")
foo.addEventListener("search", (e) => {
    // Pass keyword to API
    fetch(`/api/hop/${e.detail}`)
        .then(response => response.json())
        .then(obj => ctx.publish("__search__", obj))
})

foo.addEventListener("typeahead", (e) => {
    if (e.detail.length >= 3) {
        fetch(`/api/search/${e.detail}`)
            .then(response => response.json())
            .then(result => console.log(result))
    }
})
