import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import {persistor,store} from './redux/store';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from './history.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <HistoryRouter history={history} basename='/'>
      <Helmet>
        <title>SIDITA-TES</title>
      </Helmet>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <App />
        </PersistGate>
      </Provider>
  </HistoryRouter>
)