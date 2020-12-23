/**
 * @file app.js
 */

import Search from "./modules/search.js";
import Card from "./modules/card.js";
import Context from "./modules/context.js";

let card = document.querySelector("x-card")
setTimeout(() => {
    card.setAttribute("visible", "true")
}, 2000)

let foo = document.querySelector("x-search")
foo.addEventListener("search", (e) => console.log("foo", e))
