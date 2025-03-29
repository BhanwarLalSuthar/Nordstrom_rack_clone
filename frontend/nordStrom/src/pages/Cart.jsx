import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeCartItem } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  List,
  Paper,
  ListItem,
  Divider,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cartItems, status, error } = useSelector((state) => state.cart);

  // Local state to track shipping method for each cart item
  const [shippingMethod, setShippingMethod] = useState({});

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Initialize shipping method once cartItems load
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const initialMethods = {};
      cartItems.forEach((item) => {
        initialMethods[item._id] = 'store'; // default to "Ship to store"
      });
      setShippingMethod(initialMethods);
    }
  }, [cartItems]);

  const handleIncrease = (item) => {
    dispatch(updateCartItem({ id: item._id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCartItem({ id: item._id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeCartItem(id));
  };

  const handleShippingChange = (itemId, method) => {
    setShippingMethod((prev) => ({ ...prev, [itemId]: method }));
  };

  // Helper function to parse price strings, removing currency symbols
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(String(priceStr).replace(/[^0-9.]/g, '')) || 0;
  };

  const handleReviewOrder = () => {
    // or "Pay Now" logic
    // e.g., navigate to a payment gateway or next step
    navigate('/checkout');
  };
  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    const priceNum = parsePrice(item.product.final_price);
    return acc + priceNum * item.quantity;
  }, 0);

  // Example placeholders
  const shippingCost = subtotal >= 89 ? 0 : 9.95; // free shipping if >= $89
  const estimatedTax = subtotal * 0.08; // 8% placeholder tax
  const total = subtotal + shippingCost + estimatedTax;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Cart
      </Typography>
      {status === 'loading' && <Typography>Loading cart...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {cartItems && cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Left Column: Cart Items */}
          <Grid item xs={12} md={8}>
            <List>
              {cartItems.map((item) => {
                const priceNum = parsePrice(item.product.final_price);
                
                const itemTotal = Number(priceNum) * item.quantity;
                const method = shippingMethod[item._id] || 'store';

                return (
                  <Paper sx={{ mb: 2 }} key={item._id}>
                    <ListItem
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                    >
                      {/* Product Info (Image + Name + Remove) */}
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 1,
                        }}
                      >
                        {/* Product Image + Name */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box
                            component="img"
                            src={item.product.main_image}
                            alt={item.product.product_name}
                            sx={{
                              width: 80,
                              height: 80,
                              objectFit: 'cover',
                              border: '1px solid #ddd',
                            }}
                          />
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {item.product.product_name}
                          </Typography>
                        </Box>

                        {/* Delete Icon */}
                        <IconButton onClick={() => handleRemove(item._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>

                      {/* Price + Line Total */}
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          Price: ${priceNum}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          Total: ${itemTotal}
                        </Typography>
                      </Box>

                      {/* Quantity Controls */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <IconButton onClick={() => handleDecrease(item)}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton onClick={() => handleIncrease(item)}>
                          <AddIcon />
                        </IconButton>
                      </Box>

                      {/* Shipping Method & Arrival */}
                      <Box sx={{ width: '100%' }}>
                        <RadioGroup
                          row
                          value={method}
                          onChange={(e) => handleShippingChange(item._id, e.target.value)}
                        >
                          <FormControlLabel
                            value="store"
                            control={<Radio />}
                            label="Ship to store"
                          />
                          <FormControlLabel
                            value="home"
                            control={<Radio />}
                            label="Ship to me"
                          />
                        </RadioGroup>

                        {method === 'store' ? (
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            Arrives in store Tue, Apr 5
                          </Typography>
                        ) : (
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            Estimated delivery Wed, Apr 6
                          </Typography>
                        )}
                      </Box>
                    </ListItem>
                  </Paper>
                );
              })}
            </List>
          </Grid>

          {/* Right Column: Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Order summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping</Typography>
                <Typography>
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Estimated tax</Typography>
                <Typography>${estimatedTax.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Estimated total
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>

              {/* Payment Buttons */}
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}
                onClick={handleReviewOrder}>
                Checkout
              </Button>
              <Button variant="outlined" color="primary" fullWidth>
                PayPal
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
