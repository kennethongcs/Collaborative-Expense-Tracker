import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
      <MobileStepper
        variant="dots"
        steps={4}
        activeStep={activeStep}
        sx={{
          flexGrow: 1, bottom: 0, position: 'static', pb: 4,
        }}
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
