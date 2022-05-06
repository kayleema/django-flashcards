import React, {FormEvent} from 'react';
import {CardsRepo} from "./CardsRepo";


export default function CardEdit(props: {cardsRepo: CardsRepo, onClose: () => void}) {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const data = new FormData(event.target as HTMLFormElement);
        await props.cardsRepo.addCard(
            data.get("front") as string, 
            data.get("back") as string
        )
        props.onClose()
    }

    return (<>
        <div className='modalBg'></div>
        <div className="modal">
            <h1>カードを追加</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    表<br/>
                    <textarea autoFocus name="front" />
                </label>

                <label>
                    裏<br/>
                    <textarea name="back" />
                </label>
                <div>
                    <button type="button" className="cancel" onClick={props.onClose}>キャンセル</button>
                    <button type="submit" className="apply">追加</button>
                </div>
            </form>
        </div>
    </>)
}
