/**
 * @file app.js
 */

import Search from "./modules/search.js";
import Card from "./modules/card.js";
import Snackbar from "./modules/snackbar.js";
import Context from "./modules/context.js";

let ctx = new Context();

let snackbar = document.querySelector("x-snackbar")
ctx.subscribe({
    event: "__notify__",
    action: (payload) => {
        snackbar.updateState(payload);
        snackbar.setAttribute("visible", "true");
        setTimeout(() => {
            console.log("hiding snackbar")
            snackbar.setAttribute("visible", "false")
        }, 3000);
    }
})

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
        .then(data => ctx.publish("__search__", data))
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
