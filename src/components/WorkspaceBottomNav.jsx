import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import MobileStepper from '@mui/material/MobileStepper';
import Box from '@mui/material/Box';

const WorkspaceBottomNav = () => {
  const location = useLocation();

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let index = parseInt(location.pathname.split('/').at(-1), 10);

    if (!index) index = 0;
    else index -= 1;

    setActiveStep(index);
  }, [location]);

  return (
    <>
      {/* <NavLink
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
      </NavLink> */}
      <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={(
          <Box />
        )}
        backButton={(
          <Box />
        )}
      />
    </>
  );
};

export default WorkspaceBottomNav;
