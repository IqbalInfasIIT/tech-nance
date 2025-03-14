import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate  } from 'react-router-dom';
import './App.css';

import SourcesScreen from './Sources/SourcesScreen';
import AddSourceScreen from './Sources/AddSourceScreen';
import TransactionsScreen from './Sources/Transactions/TransactionsScreen';
import Reports from './Reports/ReportsScreen';
import Budgets from './Budgets/BudgetsScreen';
import AddCategoryScreen from './Sources/Transactions/Forms/CategoryComp/AddCategoryScreen';
import AddBudgetScreen from './Budgets/AddBudgetScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
          <Route path="/" element={<Navigate to="/sources" replace />} />
            <Route path="/sources" element={<SourcesScreen />} />
            <Route path="/add-source/:type" element={<AddSourceScreen />} />
            <Route path="/transactions/:sourceId" element={<TransactionsScreen />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/add-category/:type" element={<AddCategoryScreen />} />
            <Route path="/add-budget" element={<AddBudgetScreen />} />
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
    else if (location.pathname.includes('sources')) setSelected('sources');
    else setSelected('');
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
