import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store.jsx';
import App from './App.jsx';
import LanguageProvider from './provider/LanguageProvider.jsx'; // Import your LanguageProvider component
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </LanguageProvider>
  </React.StrictMode>,
)
