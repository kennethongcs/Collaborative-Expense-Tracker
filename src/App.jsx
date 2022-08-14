import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Error from './components/Error.jsx';

const App = () => (
  <Router>
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />}>
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  </Router>
);

export default App;
