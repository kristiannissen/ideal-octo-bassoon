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

class Card extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.state = {
            query: null
        };
    }

    connectedCallback() {
        this.render();
        this.attachEventListener();
    }

    attachEventListener() {
        this.addEventListener("click", (e) => {
            e.preventDefault();
            let target = e.target;
        });
    }

    dispatchEvent(event) {
        super.dispatchEvent(event)
        console.log("hello")
    }

    static get observedAttributes() {
        return ["query"]
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log(attrName)
        this.render();
    }

    get query() {
        return this.state.query
    }

    set query(newValue) {
        this.state.query = newValue;
        this.render();
    }

    render() {
        const html = `<div>hello</div>`
        this.innerHTML = html
    }
}

export default customElements.define("x-card", Card);
