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
        .card {
  padding: 1rem 2rem;
  border-radius: 4px;
  background: var(--bg-color);
  box-shadow: 0 1px 3px var(--color-grey);
}

.card p:last-child {
  margin: 0;
}

.card header > * {
  margin-top: 0;
  margin-bottom: 1rem;
}
.is-hidden {
    display: none !important;
}
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
            Purpose: ""
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

    update(data) {
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
                    <h4>${this.state.Name}</h4>
                </header>
                <p>here</p>
                <footer class="is-center">
                    <a class="button primary">Save</a>
                    <a class="button">Cancel</a>
                </footer>
            </div>`
        this.card.innerHTML = html
    }
}

export default customElements.define("x-card", Card);
