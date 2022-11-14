import React from 'react';
import ReactDOM from 'react-dom/client';

import Navigation from './navigation';
import initializeTranslations from './configs/translations';

import {
  ApolloProvider,
} from '@apollo/client'
import createClient from 'apollo/createClient';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./scss/index.scss";

initializeTranslations();
const client = createClient();

const root = ReactDOM.createRoot(document.getElementById('root-webchat'));
root.render(
  <ApolloProvider
    client={client}
  >
    <Navigation />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();