import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './shared/App'

const root = document.getElementById('react-root');

if (root)
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
