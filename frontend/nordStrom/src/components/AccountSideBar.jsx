import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AccountSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); // or wherever you want to redirect after logout
  };

  return (
    <Box
      sx={{
        width: '220px',
        minWidth: '220px',
        borderRight: '1px solid #ddd',
        pt: 3,
        pb: 3,
        // If you want it fixed, uncomment next lines:
        // position: 'fixed',
        // top: 0,
        // left: 0,
        // height: '100vh',
        // overflowY: 'auto',
      }}
    >
      {/* User Info */}
      <Box sx={{ px: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {user ? `${user.username}'s Account` : 'My Account'}
        </Typography>
      </Box>
      <Divider />

      {/* Navigation Links */}
      <List disablePadding>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/purchases')}>
            <ListItemText
              primary="Purchases"
              secondary="Track, manage or return"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/wishlist')}>
            <ListItemText
              primary="Wish Lists"
              secondary="Create & manage lists"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/nordy-club-rewards')}>
            <ListItemText
              primary="Nordy Club Rewards"
              secondary="Learn more & join now"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/manage-nordstrom-card')}>
            <ListItemText
              primary="Pay & Manage Nordstrom Card"
              secondary="Opens in a new tab"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/payment-methods')}>
            <ListItemText
              primary="Payment Methods"
              secondary="Add payment methods"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/shippingaddress')}>
            <ListItemText
              primary="Shipping Addresses"
              secondary="Add a shipping address"
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />

      {/* Settings */}
      <List disablePadding>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/personal-info')}>
            <ListItemText
              primary="Personal Info"
              secondary="Password, email, mobile & more"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/communications')}>
            <ListItemText
              primary="Communications"
              secondary="Email & mail preferences"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/your-store')}>
            <ListItemText primary="Your Store" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />

      {/* Help Section */}
      <List disablePadding>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/customer-service')}>
            <ListItemText
              primary="Customer Service"
              secondary="Help & FAQ"
            />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Sign Out Button (Only if user is logged in) */}
      {user && (
        <Box sx={{ px: 2, mt: 3 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ textTransform: 'none', width: '100%' }}
          >
            Sign Out
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AccountSidebar;
