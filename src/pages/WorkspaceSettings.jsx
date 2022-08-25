import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AddIcon from '@mui/icons-material/Add';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {
  red, deepPurple, blue, cyan, green, yellow, orange,
} from '@mui/material/colors';

const WorkspaceSettings = ({ user, workspace, setWorkspace }) => {
  const [workspaceList, setWorkspaceList] = useState(null);

  const theme = createTheme();
  const navigate = useNavigate();

  // eslint-disable-next-line max-len
  const avatarColors = [red[500], deepPurple[500], blue[500], cyan[500], green[500], yellow[500], orange[500]];

  /**
   * Hash map to store colors assigned to each collaborators
   */
  const userColorMap = {};

  /**
   * Assign a background color to collaborators
   * @param {Object[]} workspaces Workspace list.
   * @returns Workspace list with new color field for each user.
   */
  const assignColorsToCollaborators = (workspaces) => {
    for (let i = 0; i < workspaces.length; i += 1) {
      for (let j = 0; j < workspaces[i].users.length; j += 1) {
        const collaborator = workspaces[i].users[j];

        // assign a color if user not yet assigned a color
        if (!(collaborator.id in userColorMap)) {
          userColorMap[collaborator.id] = avatarColors[j];
        }

        // store new color key in user object
        workspaces[i].users[j].color = userColorMap[collaborator.id];
      }
    }

    return workspaces;
  };

  useEffect(() => {
    // get all workspaces for this user
    axios
      .get('/workspace', { params: { userId: user?.id } })
      .then((response) => {
        console.log(response.data);

        const updatedWorkspace = assignColorsToCollaborators(response.data);

        setWorkspaceList(updatedWorkspace);
      })
      .catch((error) => console.log(error));
  }, []);

  /**
   * Select a workspace to focus on.
   * @param {Object} selectedWorkspace Selected workspace.
   */
  const handleWorkspaceSelect = (selectedWorkspace) => {
    setWorkspace(selectedWorkspace);
    Cookies.set('workspace', JSON.stringify(selectedWorkspace));
  };

  /**
   * Return to previous page, just like clicking on browser back button.
   */
  const handleBackButton = () => {
    navigate(-1, { replace: true });
  };

  const handleAddButton = () => {
    navigate('/workspace');
  };

  /**
   * MUI avatar but with custom style.
   * @param {string} color Background color.
   * @returns MUI avatar with custom style.
   */
  const StyledAvatar = ({ color, children, ...props }) => (
    <Avatar
      sx={{
        height: 22, width: 22, fontSize: '0.8rem', bgcolor: color,
      }}
      {...props}
    >
      {children}
    </Avatar>
  );

  /**
   * Workspace cards.
   * @param {Object} workspaceItem Workspace.
   * @returns Workspace card.
   */
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
            <StyledAvatar key={collaborator.id} color={collaborator.color}>{collaborator.firstName.charAt(0).toUpperCase() + collaborator.lastName.charAt(0).toUpperCase()}</StyledAvatar>
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
        <Box mt={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="h1" variant="h5">
            Workspace Settings
          </Typography>
          <AddIcon onClick={handleAddButton} />
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
