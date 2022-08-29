import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AddIcon from '@mui/icons-material/Add';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import useTheme from '@mui/material/styles/useTheme';

const WorkspaceSettings = ({ user, workspace, setWorkspace }) => {
  const [workspaceList, setWorkspaceList] = useState(null);

  const navigate = useNavigate();

  const colors = useTheme().palette;
  // eslint-disable-next-line max-len
  const avatarColors = [colors.warning.main, colors.success.main, colors.error.main, colors.secondary.main];

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
          const newColorIndex = Object.keys(userColorMap).length;
          userColorMap[collaborator.id] = avatarColors[newColorIndex % avatarColors.length];
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

  /**
   * Go to workspace setup wizard.
   */
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
    <Container component="main" maxWidth="xs">
      <Box mt={4}>
        <ArrowBackIosNewIcon onClick={handleBackButton} />
      </Box>
      <Box mt={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography component="h1" variant="h5">
          Workspace Settings
        </Typography>
        <AddIcon color="primary" onClick={handleAddButton} />
      </Box>
      <Box mt={3}>
        <Grid container spacing={2}>
          {workspaceList?.map((workspaceItem) => (
            <Grid key={workspaceItem.id} item xs={6} sm={6}>
              <Card elevation={1}>{card(workspaceItem)}</Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default WorkspaceSettings;
