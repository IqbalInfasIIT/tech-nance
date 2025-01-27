import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';

import SourcesScreen from './Sources/SourcesScreen';
import AddSourceScreen from './Sources/AddSourceScreen';
import TransactionsScreen from './Sources/Transactions/TransactionsScreen';
import Reports from './Reports/Reports';
import Budgets from './Budgets/Budgets';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<SourcesScreen />} />
            <Route path="/sources" element={<SourcesScreen />} />
            <Route path="/add-source/:type" element={<AddSourceScreen />} />
            <Route path="/transactions/:sourceId" element={<TransactionsScreen />} />
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
    else setSelected('sources');
  }, [location.pathname]);

  return (
    <div className="sidebar">
      <ul>
        <li className={selected === 'sources' ? 'active' : ''}>
          <Link to="/sources" onClick={() => setSelected('sources')}>Sources</Link>
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
