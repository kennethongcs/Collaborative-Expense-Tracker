import React, { useState, useEffect } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const page = location.pathname.split('/').at(-1);
    setValue((page === 'dashboard') ? '' : page);
  }, [location]);

  const handleChange = (event, newValue) => {
    if (newValue) {
      navigate(`/dashboard/${newValue}`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <BottomNavigation
      sx={{
        width: '100%', bottom: 0, position: 'absolute',
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value=""
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="Add"
        value="expense"
        icon={<AddIcon />}
      />
      <BottomNavigationAction
        label="Chart"
        value="stats"
        icon={<BarChartIcon />}
      />
      <BottomNavigationAction
        label="Settings"
        value="settings"
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
