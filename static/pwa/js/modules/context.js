/**
 * @file context.js
 */
class Context {
    constructor() {
        this.listeners = []
    }

    publish(event, payload) {
        let q = this.listeners.filter(listener => listener.event === event)
        if (q.length) q.forEach(listener => listener.action(payload))
    }

    subscribe(listener) {
        this.listeners.push(listener)
    }
}

export default Context;
