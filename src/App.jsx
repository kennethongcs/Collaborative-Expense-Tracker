import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Error from './components/Error.jsx';
import Dashboard from './components/Dashboard.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';
import ExpenseDetail from './components/ExpenseDetail.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import WorkspaceForm from './components/WorkspaceForm.jsx';
import WorkspaceLayout from './components/WorkspaceLayout.jsx';
import CategoryForm from './components/CategoryForm.jsx';
import CollaboratorForm from './components/CollaboratorForm.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import Statistics from './components/Statistics.jsx';
import Settings from './components/Settings.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="workspace" element={<WorkspaceLayout />}>
            <Route index element={<WorkspaceForm />} />
            <Route path="1" element={<WorkspaceForm />} />
            <Route path="2" element={<CategoryForm />} />
            <Route path="3" element={<CollaboratorForm />} />
            <Route path="4" element={<ExpenseForm />} />
          </Route>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route
              index
              element={(
                // <ProtectedRoute user={user}>
                <Dashboard user={user} />
                // </ProtectedRoute>
            )}
            />
            <Route path="stats" element={<Statistics />} />
            <Route path="expense" element={<ExpenseForm />} />
            <Route path="expenses/:expenseId" element={<ExpenseDetail />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
