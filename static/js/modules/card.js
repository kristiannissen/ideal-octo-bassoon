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
        .toggle-visible {
            visibility: hidden;
        }
        .card {
            border-radius: 4px;
            box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
            color: rgba(0,0,0,.87);
            margin: 8px;
            min-width: 290px;
            overflow: hidden;
            position: relative;
        }
        .card::after {
            clear: both;
        }
        .card::after, .card::before {
            content: "";
            display: block;
        }
        .optional-header {
            min-height: 40px;
            padding: 16px;
            position: relative;
        }
        .optional-header {
            min-height: 40px;
            padding: 16px;
            position: relative;
        }
        .optional-header .action-icons {
            float: right;
            position: relative;
            right: -8px;
            top: 2px;
        }
        .optional-header .primary-title {
            bottom: auto;
            display: inline-block;
            padding: 0;
            position: absolute;
            top: 50%;
            -moz-transform: translate(0, -50%);
            -ms-transform: translate(0, -50%);
            -o-transform: translate(0, -50%);
            -webkit-transform: translate(0, -50%);
            transform: translate(0, -50%);
        }
        .optional-header + .primary-text {
            margin-top: calc(24px/2/2);
        }
        .optional-header + .supporting-text {
            padding-top: 0;
        }
        .primary-title .optional-header {
            padding-left: 0;
            padding-right: 0;
        }
        .subhead, .secondary-text {
            color: rgba(0,0,0,.54);
            font-size: 14px;
        }
        .title {
            font-size: 14px;
            font-weight: 500;
        }
        .title + .subhead {
            margin-top: 7px;
        }
        .title {
            line-height: 1.2;
        }
        .primary-title + .supporting-text, .optional-header + .supporting-text {
            padding-top: 0;
        }
        .supporting-text {
            font-size: 14px;
            line-height: 1.5;
            padding: 16px;
        }
    </style>
    <div id="card" class="toggle-visible"></div>
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
            this.card.classList.add("toggle-visible")
        else
            this.card.classList.remove("toggle-visible")
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

        const html = `
                <div class="card">
                    <div class="optional-header">
                        <div class="primary-title">
                            <div class="title">Name: ${this.state.Name}</div>
                            <div class="subhead">Purpose: ${this.state.Purpose}</div>
                        </div>                        
                    </div>
                    <div class="supporting-text">
                        Style Guide: ${this.state.Styleguide}<br>
                        Substitutes: ${substitutes.join(", ")}
                    </div>
                </div>
            `
        this.card.innerHTML = html
    }
}

export default customElements.define("x-card", Card);
