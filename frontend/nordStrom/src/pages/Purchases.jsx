// src/pages/Purchases.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders, deleteOrder } from '../redux/slices/orderSlice';
import AccountSidebar from '../components/AccountSideBar';
import { Box, Typography, Paper, Divider, Grid, Button } from '@mui/material';

const Purchases = () => {
  const dispatch = useDispatch();
  const { myOrders, status, error } = useSelector((state) => state.orders) || {};

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (status === 'loading') {
    return <Typography>Loading your purchases...</Typography>;
  }
  if (status === 'failed') {
    return <Typography color="error">{error || 'Failed to load purchases'}</Typography>;
  }
  if (!myOrders || myOrders.length === 0) {
    return (
      <Box sx={{ display: 'flex', maxWidth: '1200px', mx: 'auto', p: 2 }}>
        <AccountSidebar />
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography variant="h5">Purchases</Typography>
          <Typography>You have no purchases in this time period.</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', maxWidth: '1200px', mx: 'auto', p: 2 }}>
      <AccountSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Purchases
        </Typography>
        {myOrders.map((order) => (
          <Paper key={order._id} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Order #{order._id}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => dispatch(deleteOrder(order._id))}
              >
                Remove
              </Button>
            </Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Status: {order.status} | Placed on {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2}>
              {order.items.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper sx={{ p: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Box
                      component="img"
                      src={item.product?.main_image || 'https://via.placeholder.com/60'}
                      alt={item.product?.product_name || 'Product'}
                      sx={{ width: 60, height: 60, objectFit: 'cover', border: '1px solid #ddd' }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {item.product?.product_name || 'Product Name'}
                      </Typography>
                      <Typography variant="body2">
                        Qty: {item.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Price: ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Total: {order.totalAmount.toFixed(2)} {order.currency || 'INR'}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Purchases;
