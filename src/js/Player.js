export default class Player {
    constructor() {
        this.assignedKeys = []

    }

    assignKey(key) {
        this.assignedKeys.push(key)
    }
}