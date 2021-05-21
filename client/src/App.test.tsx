import React from 'react';
import {act, render, screen} from '@testing-library/react';
import App from './App';
import {NetworkCardsRepo} from "./CardsRepo";
import Card from './Card'
import userEvent from "@testing-library/user-event";
import SpyFetchWrapper from "../testHelpers/SpyFetchWrapper";

jest.mock('./CardsRepo');

describe("App", () => {
    let spyCardsRepo: NetworkCardsRepo
    beforeEach(async () => {
        spyCardsRepo = new NetworkCardsRepo(new SpyFetchWrapper())
        const mockCardsList = [
            new Card(8, "足袋", "たび"),
            new Card(9, "甲子園", "こうしえん"),
            new Card(10, "兵庫", "ひょうご")
        ]
        jest.spyOn(spyCardsRepo, 'getCards').mockResolvedValue(mockCardsList);
        jest.spyOn(spyCardsRepo, 'reviewCard').mockResolvedValue(undefined);

        await act(async () => {
            render(<App cardsRepo={spyCardsRepo}/>)
        });
    })

    test('calls api for cards and displays first card', async () => {
        expect(spyCardsRepo.getCards).toHaveBeenCalled()
        expect(await screen.findByText('足袋')).toBeInTheDocument()
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

                expect(spyCardsRepo.reviewCard).toBeCalledWith(8, true)
            })
        })
        describe('バツのボタンを押すと', () => {
            test('バックエンドのカード復習APIを呼ぶ', async () => {
                const batsu = await screen.getByText('✕️')
                userEvent.click(batsu)

                expect(spyCardsRepo.reviewCard).toBeCalledWith(8, false)
            })
        })
    })
})

