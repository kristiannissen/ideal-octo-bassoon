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
        .typeahead-item {
            padding: 10px 5px;
            border-bottom: 1px solid #d2d6dd;
        }
        .typeahead-item:last-child {
            border-bottom: 0;
        }
    </style>
    <style>
        @import url("/css/base.css");
        @import url("/css/forms.css");
    </style>
    <div id="search"></div>
`;

class Search extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.root = this._shadowRoot.querySelector("#search");
        this.root.addEventListener("click", this.updateAttribute.bind(this));
    }

    connectedCallback() {
        this.render();
        this.root.querySelector("#search-form").addEventListener("submit", (e) => {
            e.preventDefault();

            this.setAttribute("keyword", e.target["query"].value.trim())
            this.dispatchEvent(new CustomEvent("search", {
                detail: e.target["query"].value.trim()
            }));
        })
        // Typeahead
        this.root.querySelector("#query").addEventListener("keyup", (e) => {
            e.preventDefault();

            this.dispatchEvent(new CustomEvent("typeahead", {
                detail: {
                    string: e.target.value.trim(),
                    key: e.key,
                    which: e.which
                }
            }));
        })
    }

    static get observedAttributes() {
        return ["keyword"]
    }

    updateAttribute(e) {
        e.preventDefault();

        if (e.target.classList.contains("typeahead-item")) {
            this.root.querySelector("#query").value = e.target.innerHTML.trim()
            this.showTypeAhead([])
        }
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

    showTypeAhead(list) {
        let elm = this.root.querySelector(".typeahead")
        if (elm) this.root.removeChild(elm)

        let _list = list.map((item) => `<div class="typeahead-item">${item.Name}</div>`)
        let cont = document.createElement("div")
        cont.classList.add("typeahead")
        cont.innerHTML = _list.join("");
        this.root.appendChild(cont)
    }

    render() {
        const html = `<form autocomplete="off" id="search-form">
                <input type="search" id="query" name="query" value="" placeholder="">
            </form>`
        this.root.innerHTML = html
    }
}

export default customElements.define("x-search", Search);
