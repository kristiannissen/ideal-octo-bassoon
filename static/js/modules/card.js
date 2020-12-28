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
        .is-hidden {
            display: none !important;
        }
    </style>
    <style>
        @import url("/css/base.css");
        @import url("/css/cards.css");
        @import url("/css/buttons.css");
    </style>
    <div id="card" class="is-hidden"></div>
`;

class Card extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.state = {
            Name: "",
            Styleguide: "",
            Substitutes: "",
            Purpose: "",
            Country: "",
            Characteristics: "",
            Alphaacidcomposition: "",
            Betaacidcomposition: "",
        };
        this.card = this._shadowRoot.querySelector("#card")
    }

    connectedCallback() {
        this.toggleVisibility()
        this.render();
        this.attachEventListener();
    }

    static get observedAttributes() {
        return ["visible"];
    }

    toggleVisibility() {
        if (this.getAttribute("visible") === "false")
            this.card.classList.add("is-hidden")
        else
            this.card.classList.remove("is-hidden")
    }

    attributeChangedCallback(name, oldVal, newVal) {
       this.toggleVisibility() 
    }

    get visible() {
        return this.getAttribute("visible")
    }

    set visible(val) {
        if (val) this.setAttribute("visible", val)
        else this.removeAttribute("visible")
    }

    updateState(data) {
        Object.assign(this.state, data)
        this.render()
    }

    attachEventListener() {
        this.addEventListener("click", (e) => {
            e.preventDefault();
            let target = e.target;
        });
    }

    render() {
        let substitutes = this.state.Substitutes.split(",").map(str => str.trim())

        const html = `<div class="card">
                <header>
                    <h3>${this.state.Name}</h3>
                </header>
                <p>
                    Purpose: ${this.state.Purpose}<br>
                    Alternatives: ${this.state.Substitutes}<br>
                    Beer Styles: ${this.state.Styleguide}<br>
                    Characteristics: ${this.state.Characteristics}<br>
                    Country: ${this.state.Country}<br>
                </p>
                <footer class="is-center">
                </footer>
            </div>`
        this.card.innerHTML = html
    }
}

export default customElements.define("x-card", Card);
