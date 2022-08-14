import React from 'react';

const Dashboard = ({ user }) => (
  <div>
    <h2>This is the dashboard</h2>
    <h4>
      Hello,
      {' '}
      {user?.displayName}
    </h4>
  </div>
);

export default Dashboard;
