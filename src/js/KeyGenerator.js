export default class KeyGenerator {
    constructor(keys) {
        this.keys = keys
    }

    generate() {
        const randomIndex = Math.floor(Math.random() * this.keys.length)
        return this.keys[randomIndex]
    }
}