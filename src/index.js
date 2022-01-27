import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common/Common.css';
import reportWebVitals from './reportWebVitals';
import PhoneDirectory from './PhoneDirectory';
import { Provider } from 'react-redux';
import store from './Subscriber-store';

ReactDOM.render(
  <Provider store={store}>
    <PhoneDirectory />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
