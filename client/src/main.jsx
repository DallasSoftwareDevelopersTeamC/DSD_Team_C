import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './index.css';
import ErrorBoundary from './components/Errors/ErrorBoundary';
import { InventoryProvider } from './contexts/inventory.context.jsx';
import { OrdersProvider } from './contexts/orders.context.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <InventoryProvider>
      <OrdersProvider>
        <ErrorBoundary>
          <App />
        </ ErrorBoundary>
      </OrdersProvider>
    </InventoryProvider>{' '}
  </QueryClientProvider>
);
