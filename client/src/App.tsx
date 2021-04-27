import React, {useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Card, CardsRepo} from "./CardsRepo";

type AppProps = {
    cardsRepo: CardsRepo
}

function App(props: AppProps) {
    const [cards, setCards] = useState([] as Card[])
    const [showingAnswer, setShowingAnswer] = useState(false)

    const showRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        props.cardsRepo.getCards().then((cards) => {
            console.log(cards)
            setCards(cards)
        }).catch((reason) => {
            window.location.href = 'http://localhost:8000/accounts/login/'
        })
    }, [])

    useEffect(() => {
        if (showRef.current) {
            showRef.current?.focus()
        }
    }, [cards])

    return (
        <div className="App">
            <header>Django Flashcards</header>
            <h1>
                {cards.length > 0 && cards[0].front}
            </h1>
            {showingAnswer && (
                <>
                    <h2>{cards[0].back}</h2>
                    <button>Incorrect</button>
                    <button>Correct</button>
                </>
            )}
            {!showingAnswer && (
                <button ref={showRef} onClick={() => {
                    setShowingAnswer(true)
                }}>Show Answer</button>
            )}
        </div>
    );
}

export default App;
