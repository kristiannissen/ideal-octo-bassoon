/**
 * @file search.js
 */
"use strict";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
        form {
            background-color: var(--color-lightGrey)!important;
            display: flex;
            border-radius: 4px;
            padding: 1rem 2rem;
            justify-content: center;
            align-items: center;
        }
        input[type="search"] {
            width: 90%;
            border: none;
            font-size: 1.75em;
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
            </form>`
        this.root.innerHTML = html
    }
}

export default customElements.define("x-search", Search);
