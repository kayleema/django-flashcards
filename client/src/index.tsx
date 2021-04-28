import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {FetchWrapper, NetworkCardsRepo} from './CardsRepo';

class NetworkFetchRepo implements FetchWrapper {
    fetch(url: string, options?: {}): Promise<any> {
        return fetch(url, options)
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App cardsRepo={new NetworkCardsRepo(new NetworkFetchRepo())}/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
