import React from 'react';
import {act, render, screen, waitForElementToBeRemoved} from '@testing-library/react';
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
            beforeEach(async () => {
                const maru = await screen.getByText('○')
                userEvent.click(maru)
            })
            test('バックエンドのカード復習APIを呼ぶ', async () => {
                expect(spyCardsRepo.reviewCard).toBeCalledWith(8, true)
            })
            test('次のカードの表を表示', async () => {
                expect(await screen.findByText('甲子園')).toBeInTheDocument()
                expect(screen.queryByText('こうしえん')).toBeNull()
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
    describe('全て達成した場合', () => {
        beforeEach(() => {
            userEvent.click(screen.getByText('表示'))
            userEvent.click(screen.getByText('○'))
            userEvent.click(screen.getByText('表示'))
            userEvent.click(screen.getByText('○'))
            userEvent.click(screen.getByText('表示'))
            userEvent.click(screen.getByText('○'))
        })
        test('おめでとうメッセージがみえる', async () => {
            expect(await screen.findByText('全て達成しました')).toBeInTheDocument()
        })
    })
    describe('追加ボタンを押す', () => {
        beforeEach(() => {
            userEvent.click(screen.getByText('カード追加'))
        })
        test('おめでとうメッセージがみえる', async () => {
            expect(await screen.findByText('カードを追加')).toBeInTheDocument()
        })
        test('キャンセルボタン', async () => {
            expect(await screen.findByText('キャンセル')).toBeInTheDocument()
            userEvent.click(screen.getByText('キャンセル'))
            expect(screen.queryByText('カードを追加')).not.toBeInTheDocument()
        })
    })
})

