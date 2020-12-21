/**
 * @file search.js
 */
"use strict";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {display: block;}
    </style>
    <slot></slot>
`;

class Search extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    attachListeners() {
        this.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("update", {
                bubbles: true,
                detail: {
                    text: () => e.target["query"].value
                }
            }));
        })
    }

    connectedCallback() {
        this.render();
        this.attachListeners();
    }

    render() {
        const html = `<form autocomplete="off">
                <input type="search" name="query" value="" placeholder="">
                <input type="submit" value="Go!" id="search-button">
            </form>`
        this.innerHTML = html
    }
}

export default customElements.define("x-search", Search);
