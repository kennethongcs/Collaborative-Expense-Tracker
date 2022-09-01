import React from 'react';
import Avatar from '@mui/material/Avatar';

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

export default StyledAvatar;
