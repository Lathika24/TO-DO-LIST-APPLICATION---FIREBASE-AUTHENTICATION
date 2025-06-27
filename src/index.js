import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignIn from './SignIn'; // or './nameSignIn' depending on your filename
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ import routing components

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />           {/* Main Todo App */}
        <Route path="/login" element={<SignIn />} />   {/* Google Sign-In Page */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// Optional performance tracking
reportWebVitals();
