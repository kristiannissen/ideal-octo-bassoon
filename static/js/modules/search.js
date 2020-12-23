/**
 * @file search.js
 */
"use strict";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {display: block;}
        form {
            min-width: 290px;
            color: rgba(0,0,0,.87);
            margin: 8px;
            height: calc(1.5em + 0.75rem + 2px);
        }
    </style>
    <div id="search"></div>
`;

class Search extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.root = this._shadowRoot.querySelector("#search")
    }

    connectedCallback() {
        this.render();
        this.root.querySelector("#search-form").addEventListener("submit", (e) => {
            e.preventDefault();
            this.setAttribute("keyword", e.target["query"].value.trim())
        })
    }

    static get observedAttributes() {
        return ["keyword"]
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.dispatchEvent(new CustomEvent("search", {
            detail: this.getAttribute("keyword")
        }));
    }

    get keyword() {
        return this.getAttribute("keyword")
    }

    set keyword(val) {
        if (val)
            this.setAttribute("keyword", val)
        else
            this.removeAttribute("keyword")
    }

    render() {
        const html = `<form autocomplete="off" id="search-form">
                <input type="search" name="query" value="" placeholder="">
                <input type="submit" value="Go!" id="search-button">
            </form>`
        this.root.innerHTML = html
    }
}

export default customElements.define("x-search", Search);
