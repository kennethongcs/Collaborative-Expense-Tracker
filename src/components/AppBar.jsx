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

const AppBar = ({ user }) => {
  const location = useLocation();
  const index = location.pathname.split('/').at(-1);

  const [initials, setInitials] = useState();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [avatarStyle, setAvatarStyle] = useState();

  const colors = useTheme().palette;
  // eslint-disable-next-line max-len
  const avatarColors = [colors.warning.main, colors.success.main, colors.error.main, colors.secondary.main];

  useEffect(() => {
    setInitials(user?.firstName.charAt(0).toUpperCase() + user?.lastName.charAt(0).toUpperCase());

    setAvatarStyle({
      backgroundColor: avatarColors[Math.floor(Math.random() * avatarColors.length)],
    });
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

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mt={2}>
        <Box sx={{ typography: { fontSize: 27 }, ml: 1 }}>
          { (index === 'dashboard') ? `Hello, ${user.firstName}` : ''}
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
    </Container>
  );
};
export default AppBar;
