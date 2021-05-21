export default class Card {
    id: number
    front: string
    back: string

    constructor(id: number, front: string, back: string) {
        this.id = id
        this.front = front
        this.back = back
    }
}
