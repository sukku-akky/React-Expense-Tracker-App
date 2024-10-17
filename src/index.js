import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { AuthContextProvider } from './store/auth-context';
import ExpenseProvider from './store/expense-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ExpenseProvider>
    <App />
    </ExpenseProvider>
  </AuthContextProvider>
);

