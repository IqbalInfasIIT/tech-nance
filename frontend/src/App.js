import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Reports from './Reports';
import Accounts from './Accounts';
import Budgets from './Budgets';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Accounts />} />
            <Route path="/accounts" element={<Accounts />} />
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
    // Update selected state based on current URL
    if (location.pathname.includes('reports')) setSelected('reports');
    else if (location.pathname.includes('budgets')) setSelected('budgets');
    else setSelected('accounts'); // Default to accounts if URL doesn't match other paths
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
