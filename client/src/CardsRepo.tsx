import Card from "./Card";

export interface CardsRepo {
    getCards(): Promise<Card[]>
    reviewCard(id: Number, correct: Boolean): Promise<void>
}

export interface FetchWrapper {
    fetch(url: string, options?: {}): Promise<any>
}

export class NetworkCardsRepo implements CardsRepo {
    private fetchWrapper: FetchWrapper

    constructor(fetchWrapper: FetchWrapper) {
        this.fetchWrapper = fetchWrapper
    }

    async getCards(): Promise<Card[]> {
        const response = await this.fetchWrapper.fetch("/flashcards/cards/")
        if (!response.ok) {
            return Promise.reject(response.status)
        }
        const cards = await response.json()
        return cards.map((item: any) => new Card(item.id, item.front, item.back))
    }

    async reviewCard(id: Number, correct: Boolean): Promise<void> {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, isCorrect: correct})
        };

        const response = await this.fetchWrapper.fetch("/flashcards/review/", requestOptions)
        if (!response.ok) {
            return Promise.reject(response.status)
        }
        return Promise.resolve()
    }
}
