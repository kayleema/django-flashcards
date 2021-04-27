import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Card, CardsRepo} from "./CardsRepo";


class SpyCardsRepo implements CardsRepo {
  public getCards_called: boolean = false;
  public getCards_return: Card[] = [];
  getCards(): Promise<Card[]> {
    this.getCards_called = true
    return Promise.resolve(this.getCards_return);
  }
}

describe("App", () => {
  let spyCardsRepo: SpyCardsRepo
  beforeEach(() => {
    spyCardsRepo = new SpyCardsRepo()
    spyCardsRepo.getCards_return = [{front: "足袋", back: "たび"}]
    render(<App cardsRepo={spyCardsRepo}/>);
  })

  test('calls api for cards', () => {
      expect(spyCardsRepo.getCards_called).toBe(true);
  })

  test('redirect to login when not logged in', () => {
  })

  test('renders learn react link', () => {
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
})

