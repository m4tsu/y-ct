import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';
import { QueryErrorBoundary } from './libs/tanstack/QueryErrorBoundary.tsx';
import { QueryProvider } from './libs/tanstack/QueryProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <QueryErrorBoundary>
        <App />
      </QueryErrorBoundary>
    </QueryProvider>
  </React.StrictMode>,
);
