import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const WorkspaceBottomNav = () => {
  const [value, setValue] = useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <NavLink
        style={({ isActive }) => ({
          display: 'inline',
          margin: '0 1rem',
          color: isActive ? 'red' : '',
        })}
        to="/workspace/1"
      >
        1
      </NavLink>
      <NavLink
        style={({ isActive }) => ({
          display: 'inline',
          margin: '0 1rem',
          color: isActive ? 'red' : '',
        })}
        to="/workspace/2"
      >
        2
      </NavLink>
      <NavLink
        style={({ isActive }) => ({
          display: 'inline',
          margin: '0 1rem',
          color: isActive ? 'red' : '',
        })}
        to="/workspace/3"
      >
        3
      </NavLink>
      <NavLink
        style={({ isActive }) => ({
          display: 'inline',
          margin: '0 1rem',
          color: isActive ? 'red' : '',
        })}
        to="/workspace/4"
      >
        4
      </NavLink>
      <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={(
          <Button size="small" onClick={handleNext} disabled={activeStep === 3}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
      )}
        backButton={(
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
      )}
      />
    </>
  );
};

export default WorkspaceBottomNav;
