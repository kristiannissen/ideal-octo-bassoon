/**
 * @file app.js
 */

import Search from "./modules/search.js";
import Card from "./modules/card.js";

let search = document.querySelector("x-search")
search.addEventListener("update", (e) => console.log(e.detail.text()))
