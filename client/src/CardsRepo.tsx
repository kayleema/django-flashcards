
export interface Card {
    front: String
    back: String
}

export interface CardsRepo {
    getCards(): Promise<Card[]>
}

export class NetworkCardsRepo implements CardsRepo {
    async getCards(): Promise<Card[]> {
        const response = await fetch("/flashcards/cards/")
        if (!response.ok ) {
            return Promise.reject(response.status)
        }
        return await response.json()
    }
}
