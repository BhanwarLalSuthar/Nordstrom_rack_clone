import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Lock, Email, LocalShipping, Payment, CreditCard, Favorite, ShoppingCart, Store, ContactSupport } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const AccountDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(auth.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleClose();
  };

  return (
    <Box sx={{ display: 'inline-block' }}>
      {/* Sign In Button or Username with Dropdown Icon */}
      <Button
        variant="text"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        sx={{
          color: '#000',
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: 'normal',
          '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
        }}
      >
        {isAuthenticated ? auth.user.username : 'Sign In'}
      </Button>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: '300px',
            bgcolor: 'white',
            boxShadow: 3,
            borderRadius: '4px',
          },
        }}
      >
        

        {/* Authentication Section (Only shown when not authenticated) */}
        {!isAuthenticated && (
          <Box sx={{ p: 2, bgcolor: '#e6f0fa' }}>
            <Typography variant="body2" sx={{ fontSize: '14px', mb: 2 }}>
              Sign in to shop faster and easier.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate('/login');
                  handleClose();
                }}
                sx={{
                  width: '100%',
                  bgcolor: '#1976d2',
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  py: 1,
                  '&:hover': { bgcolor: '#1565c0' },
                }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  navigate('/register');
                  handleClose();
                }}
                sx={{
                  width: '100%',
                  bgcolor: '#1976d2',
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  py: 1,
                  '&:hover': { bgcolor: '#1565c0' },
                }}
              >
                Create Account
              </Button>
            </Box>
          </Box>
        )}

        {/* Your Account Section */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold', mb: 1 }}>
            Your Account
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
            {[
              { label: 'Purchases', icon: <ShoppingCart fontSize="small" /> },
              { label: 'Wish List', icon: <Favorite fontSize="small" /> },
              { label: 'Your Nordy Club Rewards', icon: <Favorite fontSize="small" /> },
              { label: 'Shipping Addresses', icon: <LocalShipping fontSize="small" /> },
              { label: 'Payment Methods', icon: <Payment fontSize="small" /> },
              { label: 'Pay & Manage Nordstrom Card', icon: <CreditCard fontSize="small" /> },
            ].map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => {
                  navigate(`/${item.label.toLowerCase().replace(/\s+/g, '-')}`);
                  handleClose();
                }}
                sx={{ py: 1 }}
              >
                <Box sx={{ mr: 2 }}>{item.icon}</Box>
                <Typography variant="body2" sx={{ fontSize: '14px' }}>
                  {item.label}
                </Typography>
              </MenuItem>
            ))}
          </Box>
        </Box>

        {/* Account Settings Section */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold', mb: 1 }}>
            Account Settings
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
            {[
              { label: 'Password & Personal Info', icon: <Lock fontSize="small" /> },
              { label: 'Email & Mail Preferences', icon: <Email fontSize="small" /> },
            ].map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => {
                  navigate(`/${item.label.toLowerCase().replace(/\s+/g, '-')}`);
                  handleClose();
                }}
                sx={{ py: 1 }}
              >
                <Box sx={{ mr: 2 }}>{item.icon}</Box>
                <Typography variant="body2" sx={{ fontSize: '14px' }}>
                  {item.label}
                </Typography>
              </MenuItem>
            ))}
          </Box>
        </Box>

        {/* Need Help? Section */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold', mb: 1 }}>
            Need Help?
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
            {[
              { label: 'Contact Us', icon: <ContactSupport fontSize="small" /> },
              { label: 'Find a Store', icon: <Store fontSize="small" /> },
            ].map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => {
                  navigate(`/${item.label.toLowerCase().replace(/\s+/g, '-')}`);
                  handleClose();
                }}
                sx={{ py: 1 }}
              >
                <Box sx={{ mr: 2 }}>{item.icon}</Box>
                <Typography variant="body2" sx={{ fontSize: '14px' }}>
                  {item.label}
                </Typography>
              </MenuItem>
            ))}
          </Box>
        </Box>

        {/* Logout Button (Only shown when authenticated) */}
        {isAuthenticated && (
          <Box sx={{ p: 2, bgcolor: '#e6f0fa' }}>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                width: '100%',
                bgcolor: '#1976d2',
                color: 'white',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                py: 1,
                '&:hover': { bgcolor: '#1565c0' },
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default AccountDropdown;