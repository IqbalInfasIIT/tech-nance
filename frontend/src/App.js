//App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Reports from './Reports/Reports';
import Accounts from './Accounts/Accounts';
import Budgets from './Budgets/Budgets';
import AddAccount from './Accounts/AddAccount';
import Transactions from './Accounts/Transactions/Transactions';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Accounts />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/add-account" element={<AddAccount />} />
            <Route path="/transactions/:accountId" element={<Transactions />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/budgets" element={<Budgets />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Sidebar() {
  const location = useLocation();
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (location.pathname.includes('reports')) setSelected('reports');
    else if (location.pathname.includes('budgets')) setSelected('budgets');
    else setSelected('accounts');
  }, [location.pathname]);

  return (
    <div className="sidebar">
      <ul>
        <li className={selected === 'accounts' ? 'active' : ''}>
          <Link to="/accounts" onClick={() => setSelected('accounts')}>Accounts</Link>
        </li>
        <li className={selected === 'reports' ? 'active' : ''}>
          <Link to="/reports" onClick={() => setSelected('reports')}>Reports</Link>
        </li>
        <li className={selected === 'budgets' ? 'active' : ''}>
          <Link to="/budgets" onClick={() => setSelected('budgets')}>Budgets</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
