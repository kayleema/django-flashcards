import {NetworkCardsRepo} from "./CardsRepo";
import Card from "./Card";
import SpyFetchWrapper from "../testHelpers/SpyFetchWrapper";

describe('CardsRepo', () => {
    describe('getCards', () => {
        test('returns a list of cards', async () => {
            const spyGetCardsFetchWrapper = new SpyFetchWrapper()
            spyGetCardsFetchWrapper.fetch_return_value = {
                ok: true,
                json: () => ([{id: 1, author: "summer", front: "足袋", back: "たび"}])
            }
            const cardsRepo = new NetworkCardsRepo(spyGetCardsFetchWrapper)

            const result = await cardsRepo.getCards()
            expect(result).toEqual([new Card(1, "足袋", "たび")])
        })
        test('returns promise rejection when response not ok', async () => {
            const spyGetCardsFetchWrapper = new SpyFetchWrapper()
            spyGetCardsFetchWrapper.fetch_return_value = {
                ok: false,
                status: 403
            }
            const cardsRepo = new NetworkCardsRepo(spyGetCardsFetchWrapper)

            const result = cardsRepo.getCards()

            await expect(result).rejects.toEqual(403)
        })
    })

    describe('reviewCard', () => {
        test('calls /review endpoint with post and json body', async () => {
            const spyGetCardsFetchWrapper = new SpyFetchWrapper()
            const cardsRepo = new NetworkCardsRepo(spyGetCardsFetchWrapper)
            spyGetCardsFetchWrapper.fetch_return_value = {
                ok: true
            }

            await cardsRepo.reviewCard(1, true)

            expect(spyGetCardsFetchWrapper.fetch_arg_url).toEqual("/flashcards/review/")
            expect(spyGetCardsFetchWrapper.fetch_arg_options).toEqual({
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: 1, isCorrect: true})
            })
        })

        test('returns promise rejection when response not ok', async () => {
            const spyGetCardsFetchWrapper = new SpyFetchWrapper()
            spyGetCardsFetchWrapper.fetch_return_value = {
                ok: false,
                status: 403
            }
            const cardsRepo = new NetworkCardsRepo(spyGetCardsFetchWrapper)

            const result = cardsRepo.reviewCard(1, true)

            await expect(result).rejects.toEqual(403)
        })
    })
})
