import React from 'react';
import {act, render, screen, waitFor} from '@testing-library/react';
import CardEdit from './CardEdit';
import {NetworkCardsRepo} from "./CardsRepo";
import Card from './Card'
import userEvent from "@testing-library/user-event";
import SpyFetchWrapper from "../testHelpers/SpyFetchWrapper";

jest.mock('./CardsRepo');

describe("CardEdit", () => {
    let spyCardsRepo: NetworkCardsRepo
    let onCloseSpy: jest.Mock
    beforeEach(async () => {
        spyCardsRepo = new NetworkCardsRepo(new SpyFetchWrapper())
        jest.spyOn(spyCardsRepo, 'addCard').mockResolvedValue();
        onCloseSpy = jest.fn()

        await act(async () => {
            render(<CardEdit cardsRepo={spyCardsRepo} onClose={onCloseSpy}/>)
        });
    })

    test('フォームを表示', async () => {
        expect(await screen.findByText('カードを追加')).toBeInTheDocument()
    })

    test('入力して追加ボタンを押す', async () => {
        userEvent.type(screen.getByLabelText('表'), "fronttext")
        userEvent.type(screen.getByLabelText('裏'), "backtext")
        userEvent.click(screen.getByText("追加"))

        expect(spyCardsRepo.addCard).toBeCalledWith("fronttext", "backtext")
        await waitFor(() => {
            expect(onCloseSpy).toBeCalled()
        })
    })
})

