import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import ResetPassword from './ResetPassword';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ResetPassword />
  </React.StrictMode>
);
