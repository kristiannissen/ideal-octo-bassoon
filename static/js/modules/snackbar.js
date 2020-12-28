/**
 * @file snackbar.js
 */
"use strict";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
        .is-hidden {
            display: none !important;
        }
    </style>
    <style>
        @import url("/css/base.css");
    </style>
    <div id="snackbar" class="is-hidden"></div>
`;

class Snackbar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.root = this._shadowRoot.querySelector("#snackbar");
        this.state = {
            text: "",
            type: "info"
        };
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ["visible"];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.toggleVisibility();
    }

    updateState(data) {
        Object.assign(this.state, data);
    }

    get visible() {
        return this.getAttribute("visible");
    }

    set visible(val) {
        if (val) this.setAttribute("visible", val)
        else this.removeAttribute("visible")
    }

    toggleVisibility() {
        if (this.getAttribute("visible") === "false") this.root.classList.add("is-hidden")
        else this.root.classList.remove("is-hidden")
    }

    render() {
        let html = `<div class="message">${this.state.text}</div>`
        this.root.innerHTML = html;
    }
}

export default customElements.define("x-snackbar", Snackbar);
