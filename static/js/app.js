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
    let eventDetails = e.detail;

    if (eventDetails.string.length >= 3 && eventDetails.which != 13) {
        card.setAttribute("visible", "false")

        fetch(`/api/search/${eventDetails.string}`)
            .then(response => response.json())
            .then(result => foo.showTypeAhead(result))
    }
})
