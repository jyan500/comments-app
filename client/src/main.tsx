import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux"
import "./index.css"
import { store } from "./store"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// the change to render is necessary for the React WYSIWYG toolbar dropdowns to work
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
);
