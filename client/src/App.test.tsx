import React from 'react';
import {act, render, screen} from '@testing-library/react';
import App from './App';
import {NetworkCardsRepo} from "./CardsRepo";
import userEvent from "@testing-library/user-event";
import {StubFetchWrapper} from "./CardsRepo.test";

jest.mock('./CardsRepo');

describe("App", () => {
    let spyCardsRepo: NetworkCardsRepo
    beforeEach(async () => {
        spyCardsRepo = new NetworkCardsRepo(new StubFetchWrapper())
        const mockCardsList = [
            {front: "足袋", back: "たび"},
            {front: "甲子園", back: "こうしえん"},
            {front: "兵庫", back: "ひょうご"}
        ]
        jest.spyOn(spyCardsRepo, 'getCards').mockResolvedValue(mockCardsList);
        jest.spyOn(spyCardsRepo, 'reviewCard').mockResolvedValue(undefined);

        await act(async () => {
            render(<App cardsRepo={spyCardsRepo}/>)
        });
    })

    test('calls api for cards and displays first card', async () => {
        expect(await screen.findByText('足袋')).toBeInTheDocument()
        expect(spyCardsRepo.getCards).toHaveBeenCalled()
    })

    describe('表示のボタンを押すと', () => {
        beforeEach(() => {
            const hyouji = screen.getByText('表示')
            userEvent.click(hyouji)
        })
        test('丸とバツのボタンを表示します', async () => {
            expect(await screen.findByText('たび')).toBeInTheDocument()

            const maru = screen.getByText('○')
            const batsu = screen.getByText('✕️')
            expect(maru).toBeInTheDocument()
            expect(batsu).toBeInTheDocument()
        })
        describe('丸のボタンを押すと', () => {
            test('バックエンドのカード復習APIを呼ぶ', async () => {
                const maru = await screen.getByText('○')
                userEvent.click(maru)

                expect(spyCardsRepo.reviewCard).toBeCalledWith(true)
            })
        })
        describe('バツのボタンを押すと', () => {
            test('バックエンドのカード復習APIを呼ぶ', async () => {
                const batsu = await screen.getByText('✕️')
                userEvent.click(batsu)

                expect(spyCardsRepo.reviewCard).toBeCalledWith(false)
            })
        })
    })
})

