import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { red, green, blue } from '@mui/material/colors';

const WorkspaceSettings = ({ user, workspace, setWorkspace }) => {
  const [workspaceList, setWorkspaceList] = useState(null);

  const theme = createTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const params = {
      params: {
        userId: user?.id,
      },
    };

    axios
      .get('/workspace', params)
      .then((response) => {
        console.log(response.data);
        setWorkspaceList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleWorkspaceSelect = (selectedWorkspace) => {
    setWorkspace(selectedWorkspace);
    Cookies.set('workspace', JSON.stringify(selectedWorkspace));
  };

  const handleBackButton = () => {
    navigate(-1, { replace: true });
  };

  const avatarColors = [red[500], green[500], blue[500]];

  const StyledAvatar = ({ children, ...props }) => (
    <Avatar
      className={avatarColors[Math.floor(Math.random() * avatarColors.length)]}
      sx={{
        height: 22, width: 22, fontSize: '0.8rem', bgcolor: avatarColors[Math.floor(Math.random() * 3)],
      }}
      {...props}
    >
      {children}
    </Avatar>
  );

  const card = (workspaceItem) => (
    <>
      <CardContent>
        <Typography variant="h6" component="div">
          {workspaceItem.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {workspaceItem.purpose}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button sx={{ fontSize: '0.8rem' }} onClick={() => handleWorkspaceSelect(workspaceItem)}>
          {(workspaceItem.id === workspace.id) ? 'Selected' : 'Select'}
        </Button>
        <AvatarGroup
          max={3}
          sx={{
            '& .MuiAvatar-root': { width: 22, height: 22, fontSize: '0.8rem' },
          }}
        >
          {workspaceItem.users?.map((collaborator) => (
            <StyledAvatar key={collaborator.id}>{collaborator.firstName.charAt(0).toUpperCase() + collaborator.lastName.charAt(0).toUpperCase()}</StyledAvatar>
          ))}
        </AvatarGroup>
      </CardActions>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box mt={4}>
          <ArrowBackIosNewIcon onClick={handleBackButton} />
        </Box>
        <Box mt={3}>
          <Typography component="h1" variant="h5">
            Workspace Settings
          </Typography>
        </Box>
        <Box mt={3}>
          <Grid container spacing={2}>
            {workspaceList?.map((workspaceItem) => (
              <Grid key={workspaceItem.id} item xs={6} sm={6}>
                <Card variant="outlined">{card(workspaceItem)}</Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default WorkspaceSettings;
