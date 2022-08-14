import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Error from './components/Error.jsx';
import Dashboard from './components/Dashboard.jsx';
import SharedLayout from './components/SharedLayout.jsx';
import SingleExpense from './components/SingleExpense.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<SharedLayout />}>
            <Route
              index
              element={(
                <ProtectedRoute user={user}>
                  <Dashboard user={user} />
                </ProtectedRoute>
            )}
            />
            <Route path="stats" element={<div>stats</div>} />
            <Route path="expenses/:expenseId" element={<SingleExpense />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
