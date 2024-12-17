import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';



const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <StrictMode>
    <BrowserRouter basename='/dynamic-resume'>
      <App />
    </BrowserRouter>
  </StrictMode>
);