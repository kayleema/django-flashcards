import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {CardsRepo} from "./CardsRepo";
import Card from "./Card";

type AppProps = {
    cardsRepo: CardsRepo
}

function App(props: AppProps) {
    const [cards, setCards] = useState([] as Card[])
    const [showingAnswer, setShowingAnswer] = useState(false)

    const showRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        props.cardsRepo.getCards().then((cards) => {
            setCards(cards)
        }).catch((reason) => {
            // window.location.href = 'http://localhost:8000/accounts/login/'
        })
    }, [props.cardsRepo])

    useEffect(() => {
        if (showRef.current) {
            showRef.current?.focus()
        }
    }, [cards])

    function handleReviewButtonClick(isCorrect: Boolean) {
        props.cardsRepo.reviewCard(cards[0].id, isCorrect).then()
    }

    return (
        <div className="App">
            <header>分散学習</header>
            <h1>
                {cards.length > 0 && cards[0].front}
            </h1>
            {showingAnswer && (
                <>
                    <h2>{cards[0].back}</h2>
                    <button onClick={() => {handleReviewButtonClick(false)}}>✕️</button>
                    <button onClick={() => {handleReviewButtonClick(true)}}>○</button>
                </>
            )}
            {!showingAnswer && (
                <button ref={showRef} onClick={() => {
                    setShowingAnswer(true)
                }}>表示</button>
            )}
        </div>
    );
}

export default App;
