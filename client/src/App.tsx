import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {CardsRepo} from "./CardsRepo";
import Card from "./Card";
import CardEdit from './CardEdit';

type AppProps = {
    cardsRepo: CardsRepo
}

function App(props: AppProps) {
    const [cards, setCards] = useState([] as Card[])
    const [showingAnswer, setShowingAnswer] = useState(false)
    const [dialogState, setDialogState] = useState(false)

    const showRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        props.cardsRepo.getCards().then((cards) => {
            setCards(cards)
        }).catch((reason) => {
            if(window.location.host === "localhost:3000"){
                window.location.href = 'http://localhost:8000/accounts/login/'
            } else {
                window.location.href = '/accounts/login/'
            }
        })
    }, [props.cardsRepo])

    useEffect(() => {
        if (showRef.current) {
            showRef.current?.focus()
        }
    }, [cards])

    function handleReviewButtonClick(isCorrect: Boolean) {
        const reviewId = cards[0].id
        const result = props.cardsRepo.reviewCard(reviewId, isCorrect)
        setShowingAnswer(false)
        setCards(cards.filter((card) => card.id !== reviewId))
    }

    return (
        <div className="App">
            <header>
                <span className="brand">🎒</span>
                <button onClick={() => {setDialogState(true)}}>カード追加</button>
            </header>
            <h1>
                {cards.length > 0 && cards[0].front}
                {cards.length === 0 && <span>全て達成しました</span>}
            </h1>
            {showingAnswer && (
                <>
                    <h2>{cards[0].back}</h2>
                    <button onClick={() => {handleReviewButtonClick(false)}}>✕️</button>
                    <button onClick={() => {handleReviewButtonClick(true)}}>○</button>
                </>
            )}
            {!showingAnswer && cards.length > 0 && (
                <button ref={showRef} onClick={() => {
                    setShowingAnswer(true)
                }}>表示</button>
            )}
            {dialogState && (
                <CardEdit 
                    cardsRepo={props.cardsRepo} 
                    onClose={() => setDialogState(false)}
                />
            )}
        </div>
    );
}

export default App;
