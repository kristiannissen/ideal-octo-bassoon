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
            Name: "",
            Styleguide: "",
            Substitutes: "",
            Purpose: ""
        };
    }

    connectedCallback() {
        this.render();
        this.attachEventListener();
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
        const html = `
                <div>
                    <div>Name: ${this.state.Name}</div>
                    <div>Style Guide: ${this.state.Styleguide}</div>
                    <div>Substitutes: ${this.state.Substitutes}</div>
                    <div>Purpose: ${this.state.Purpose}</div>
                </div>
            `
        this.innerHTML = html
    }
}

export default customElements.define("x-card", Card);
