/**
 * @file resultlist.js
 */
let template = document.createElement("template")
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
    </style>
    <slot></slot>
`;

class ResultList extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        // Component state
        this.state = {
            items: []
        }
    }

    update(data) {
        this.state.items = data
        this.render();
    }

    connectedCallback() {
        console.log("connected")
        this.render()
    }

    render() {
        const html = `<div>Hello</div>`
        this.innerHTML = html
    }
}

export default customElements.define("x-list", ResultList);
