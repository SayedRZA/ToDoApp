import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Choose your preferred theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import "primeflex/primeflex.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);