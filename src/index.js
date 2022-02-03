import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/global.css'; // This only contains styling for html, body, and #root
import App from './App/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

