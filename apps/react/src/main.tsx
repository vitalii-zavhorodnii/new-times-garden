import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { TelegramWebApp } from 'react-telegram-webapp';

import App from './App.tsx';
import './main.scss';
import { store } from './services/store.ts';

async function validateHash(hash: string): Promise<boolean> {
  console.log({ hash });
  // const response = await fetch(`/api/validate`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({ hash })
  // });

  // return response.ok;

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
