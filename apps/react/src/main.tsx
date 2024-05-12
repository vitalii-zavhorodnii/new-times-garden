import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { TelegramWebApp } from 'react-telegram-webapp';

import App from './App.tsx';
import './main.scss';
import { store } from './services/store.ts';

async function validateHash() {
  return true;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TelegramWebApp validateHash={validateHash}>
      <Provider store={store}>
        <App />
      </Provider>
    </TelegramWebApp>
  </React.StrictMode>
);
