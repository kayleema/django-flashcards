import {FetchWrapper, NetworkCardsRepo} from "./CardsRepo";

export class StubFetchWrapper implements FetchWrapper {
    fetch_return_value?: any

    fetch(url: string, options?: {}): Promise<any> {
        return Promise.resolve(this.fetch_return_value)
    }
}

describe('CardsRepo', () => {
    describe('getCards', () => {
        test('returns a list of cards', async () => {
            const stubGetCardsFetchWrapper = new StubFetchWrapper()
            stubGetCardsFetchWrapper.fetch_return_value = {
                ok: true,
                json: () => ([{front: "足袋", back: "たび"}])
            }
            const cardsRepo = new NetworkCardsRepo(stubGetCardsFetchWrapper)

            const result = await cardsRepo.getCards()

            expect(result).toEqual([{front: "足袋", back: "たび"}])
        })
        test('returns promise rejection when response not ok', async () => {
            const stubGetCardsFetchWrapper = new StubFetchWrapper()
            stubGetCardsFetchWrapper.fetch_return_value = {
                ok: false,
                status: 403
            }
            const cardsRepo = new NetworkCardsRepo(stubGetCardsFetchWrapper)

            const result = cardsRepo.getCards()

            await expect(result).rejects.toEqual(403)
        })
    })
})