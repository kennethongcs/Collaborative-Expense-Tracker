import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import AvatarGroup from '@mui/material/AvatarGroup';
import StyledAvatar from './StyledAvatar.jsx';

const settings = [
  {
    name: 'Profile',
    url: '/profile',
  },
  {
    name: 'Workspace',
    url: '/workspace/settings',
  },
  {
    name: 'Logout',
    url: '/',
  },
];

const AppBar = ({ user, workspace, setWorkspace }) => {
  const location = useLocation();
  const index = location.pathname.split('/').at(-1);
  const [initials, setInitials] = useState();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [avatarStyle, setAvatarStyle] = useState();

  const colors = useTheme().palette;
  // eslint-disable-next-line max-len

  const avatarColors = [
    colors.warning.main,
    colors.success.main,
    colors.error.main,
    colors.secondary.main,
  ];

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
    setInitials(
      user?.firstName.charAt(0).toUpperCase()
        + user?.lastName.charAt(0).toUpperCase(),
    );

    setAvatarStyle({
      backgroundColor:
        avatarColors[Math.floor(Math.random() * avatarColors.length)],
    });

    // make sure collaborators info exist if missing
    if (!workspace.users) {
      axios
        .get('/workspace/collaborators', {
          params: {
            workspaceId: workspace.id,
          },
        })
        .then((res) => {
          setWorkspace(assignColorsToCollaborators([res.data])[0]);
        });
    } else {
      setWorkspace(assignColorsToCollaborators([workspace])[0]);
    }
  }, [user]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const handleClickUserMenu = (setting) => {
    if (setting.name === 'Logout') {
      axios.post('/logout').catch((error) => console.log(error));
    }

    navigate(setting.url);
  };

  console.log(workspace);

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mt={2}>
        <Box sx={{ typography: { fontSize: 26 }, ml: 1 }}>
          {index === 'dashboard' ? `Hello, ${user.firstName}` : ''}
        </Box>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={avatarStyle}>{initials}</Avatar>
        </IconButton>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
              <Typography
                textAlign="center"
                color="primary"
                onClick={() => handleClickUserMenu(setting)}
              >
                {setting.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box
        sx={{
          ml: 1, mt: 1, display: 'flex', justifyContent: 'space-between',
        }}
      >
        {workspace.name}

        <AvatarGroup
          max={3}
          sx={{
            '& .MuiAvatar-root': {
              width: 22,
              height: 22,
              fontSize: '0.8rem',
            },
          }}
        >
          {workspace.users?.map((collaborator) => (
            <StyledAvatar key={collaborator.id} color={collaborator.color}>{collaborator.firstName.charAt(0).toUpperCase() + collaborator.lastName.charAt(0).toUpperCase()}</StyledAvatar>
          ))}
        </AvatarGroup>
      </Box>
    </Container>
  );
};
export default AppBar;
