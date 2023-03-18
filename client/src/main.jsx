import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './index.css';
import { InventoryProvider } from './contexts/inventory.context.jsx';
import { OrdersProvider } from './contexts/orders.context.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <InventoryProvider>
      <OrdersProvider>
        <App />
      </OrdersProvider>
    </InventoryProvider>{' '}
  </QueryClientProvider>
);
