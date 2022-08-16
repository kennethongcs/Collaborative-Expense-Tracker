import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue) {
      navigate(`/dashboard/${newValue}`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <BottomNavigation sx={{ width: '100%', bottom: 0, position: 'absolute' }} value={value} onChange={handleChange}>
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
