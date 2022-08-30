import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Error from './components/Error.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import ExpenseDetail from './pages/ExpenseDetail.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import WorkspaceForm from './pages/WorkspaceForm.jsx';
import WorkspaceLayout from './layouts/WorkspaceLayout.jsx';
import CategoryForm from './pages/CategoryForm.jsx';
import CollaboratorForm from './pages/CollaboratorForm.jsx';
import ExpenseForm from './pages/ExpenseForm.jsx';
import Statistics from './pages/Statistics.jsx';
import Settings from './pages/Settings.jsx';
import WorkspaceSettings from './pages/WorkspaceSettings.jsx';
import Profile from './pages/Profile.jsx';

const App = () => {
  const [user, setUser] = useState(() => {
    const loggedInUser = Cookies.get('user');
    console.log(loggedInUser);
    if (loggedInUser) {
      return JSON.parse(loggedInUser);
    }
    return {};
  });

  const [workspace, setWorkspace] = useState(() => {
    const selectedWorkspace = Cookies.get('workspace');
    console.log(selectedWorkspace);
    if (selectedWorkspace) {
      return JSON.parse(selectedWorkspace);
    }
    return {};
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login setUser={setUser} setWorkspace={setWorkspace} />}
        />
        <Route path="signup" element={<Signup />} />

        <Route path="workspace/settings" element={<WorkspaceSettings user={user} workspace={workspace} setWorkspace={setWorkspace} />} />

        <Route path="workspace" element={<WorkspaceLayout />}>
          <Route index element={<WorkspaceForm user={user} setWorkspace={setWorkspace} />} />
          <Route path="1" element={<WorkspaceForm setWorkspace={setWorkspace} />} />
          <Route path="2" element={<CategoryForm workspace={workspace} />} />
          <Route path="3" element={<CollaboratorForm workspace={workspace} />} />
          <Route path="4" element={<ExpenseForm workspace={workspace} />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout user={user} />}>
          <Route
            index
            element={
                // <ProtectedRoute user={user}>
              <Dashboard user={user} workspace={workspace} />
                // </ProtectedRoute>
              }
          />
          <Route path="stats" element={<Statistics workspace={workspace} />} />
          <Route path="expense" element={<ExpenseForm />} />
          <Route path="expenses/:expenseId" element={<ExpenseDetail />} />
          <Route path="settings" element={<Settings user={user} setUser={setUser} />} />
        </Route>

        <Route path="profile" element={<Profile user={user} setUser={setUser} />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
