/**
 * @file app.js
 */

import Search from "./modules/search.js";
import Card from "./modules/card.js";
import Context from "./modules/context.js";

const context = new Context();

let search = document.querySelector("x-search")
search.addEventListener("update", (e) => {

    fetch(`/api/hop/${e.detail.text()}`)
        .then(resp => resp.json())
        .then(data => context.publish("__results__", data))
})

let card = document.querySelector("x-card")
    context.subscribe({
        event: "__results__",
        action: (payload) => card.update(payload)
    })

context.subscribe({
    event: "__results__",
    action: (payload) =>
        localStorage.setItem("__results__", JSON.stringify(payload))
})
