import React from 'react';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleClick}>
      <Typography variant="h6" component="div" sx={{  }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Nordstrom_Rack_logo_2023.svg" alt="logo"
        style={{ width: '120px', height: 'auto' }} />
      </Typography>
    </Box>
  );
};

export default Logo;
