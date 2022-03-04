import Card from "./Card";

function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export interface CardsRepo {
    getCards(): Promise<Card[]>
    reviewCard(id: Number, correct: Boolean): Promise<void>
    addCard(front: string, back: string): Promise<void>
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
        const response = await this.fetchWrapper.fetch("/flashcards/due/")
        if (!response.ok) {
            return Promise.reject(response.status)
        }
        const cards = await response.json()
        return cards.map((item: any) => new Card(item.id, item.front, item.back))
    }

    async addCard(front: string, back: string): Promise<void> {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({front, back}),
        };

        const response = await this.fetchWrapper.fetch("/flashcards/cards/", requestOptions)
        if (!response.ok) {
            return Promise.reject(response.status)
        }
        await response.json()
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
