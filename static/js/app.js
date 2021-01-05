/**
 * @file app.js
 */

import Search from "./modules/search.js";
import Card from "./modules/card.js";
import Snackbar from "./modules/snackbar.js";
import Context from "./modules/context.js";

let ctx = new Context();

let dashboard = document.querySelector("#dashboard")
// TODO come up with something better
fetch(`/api/dashboard`)
    .then(resp => resp.json())
    .then(data => {
        let date = new Date(Date.parse(data.FileModTime))
        let table = dashboard.querySelector("#table")
        table.innerHTML = `<h4>Number of Hops ${data.NumberOfHops}</h4>
            <p>The list was last updated ${date.toLocaleString()}</p>`
    })

let snackbar = document.querySelector("x-snackbar")
ctx.subscribe({
    event: "__notify__",
    action: (payload) => {
        snackbar.updateState(payload);
        snackbar.setAttribute("visible", "true");
        setTimeout(() => {
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
    let eventDetails = e.detail,
        currentKeyword = "";

    if (eventDetails.string.length >= 3 && eventDetails.which != 13) {
        card.setAttribute("visible", "false")

        fetch(`/api/search/${eventDetails.string}`)
            .then(response => response.json())
            .then(result => {
                if (result.length === 0)
                    ctx.publish("__notify__", {
                        text: `Search for ${eventDetails.string} returns 0 results`
                    })
                else
                    foo.showTypeAhead(result)
            })
    }
})
