import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Payment from '../components/Payment'; // Razorpay Payment component
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { fetchCart } from '../redux/slices/cartSlice';
import { fetchAddresses, updateAddress } from '../redux/slices/addressSlice';

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseFloat(String(priceStr).replace(/[^0-9.]/g, '')) || 0;
};

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state for cart and addresses
  const { cartItems } = useSelector((state) => state.cart);
  const { addresses } = useSelector((state) => state.address);

  // Local state for shipping address selection and primary flag
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isPrimary, setIsPrimary] = useState(false);
  const [expandedAddressId, setExpandedAddressId] = useState(null);

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchAddresses());
  }, [dispatch]);

  // Pre-select the primary address if exists
  useEffect(() => {
    const primary = addresses.find((addr) => addr.isPrimary === true);
    if (primary) {
      setSelectedAddressId(primary._id);
      setIsPrimary(true);
    }
  }, [addresses]);

  // Compute cart totals
  const subtotal = cartItems.reduce((acc, item) => {
    const priceNum = parsePrice(item.product.final_price);
    return acc + priceNum * item.quantity;
  }, 0);
  const shipping = subtotal >= 89 ? 0 : 9.95;
  const estimatedTax = subtotal * 0.08;
  const total = subtotal + shipping + estimatedTax;

  // Prepare cart item list for display (if needed by Payment component, you can pass cartItems directly)
  const cartItemList = cartItems.map((item) => {
    const priceNum = parsePrice(item.product.final_price);
    return {
      _id: item._id,
      name: item.product.product_name,
      image: item.product.main_image,
      quantity: item.quantity,
      linePrice: priceNum * item.quantity,
    };
  });

  // Handlers
  const handleEditShoppingBag = () => {
    navigate('/cart');
  };

  const handleSelectAddress = (addrId) => {
    setSelectedAddressId(addrId);
    setIsPrimary(false); // reset if user changes
    setExpandedAddressId(addrId); // show action buttons for that address
  };

  const handleAddNewAddress = () => {
    navigate('/shippingaddress');
  };

  const handleUseThisAddress = async () => {
    if (!expandedAddressId) return;
    if (isPrimary) {
      await dispatch(updateAddress({ id: expandedAddressId, data: { isPrimary: true } }));
    }
    await dispatch(fetchAddresses());
    setExpandedAddressId(null);
  };

  const handleCancelSelect = () => {
    setExpandedAddressId(null);
    setIsPrimary(false);
  };

  // Handler to be passed to Payment component after payment success
  const onPaymentSuccess = (order) => {
    console.log('Payment successful, order:', order);
    // You can navigate to a confirmation page here
  };

  const onPaymentFailure = (message) => {
    console.error('Payment failed:', message);
    // Show an error message to the user if needed
  };

  return (
    <Box sx={{ display: 'flex', maxWidth: '1200px', mx: 'auto', p: 2 }}>
      {/* Left Column */}
      <Box sx={{ flex: 1, pr: 2 }}>
        {/* Checkout Box */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Checkout
            </Typography>
            <Button
              variant="text"
              startIcon={<EditIcon />}
              onClick={handleEditShoppingBag}
              sx={{ textTransform: 'none' }}
            >
              Edit Shopping Bag
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          {cartItemList.map((item) => (
            <Box key={item._id} sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{ width: 60, height: 60, objectFit: 'cover', border: '1px solid #ddd' }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2">{item.name}</Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Quantity: {item.quantity}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                ${item.linePrice.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Paper>

        {/* Shipping Address Box */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Shipping address
          </Typography>
          {addresses.length === 0 ? (
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                No address found. Please add one.
              </Typography>
              <Button variant="contained" onClick={handleAddNewAddress}>
                Add New Address
              </Button>
            </Box>
          ) : (
            <Box>
              {addresses.map((addr) => {
                const addrLabel = `${addr.firstName} ${addr.lastName}, ${addr.address}\n${addr.city}, ${addr.state} ${addr.pincode}`;
                const isThisPrimaryLabel = addr.isPrimary ? ' (Primary)' : '';
                const displayLabel = `${addrLabel}${isThisPrimaryLabel}`;

                return (
                  <Box key={addr._id} sx={{ mb: 2 }}>
                    <FormControlLabel
                      value={addr._id}
                      control={
                        <Radio
                          checked={selectedAddressId === addr._id}
                          onChange={() => handleSelectAddress(addr._id)}
                        />
                      }
                      label={displayLabel}
                      sx={{ alignItems: 'flex-start' }}
                    />
                    {expandedAddressId === addr._id && (
                      <Box sx={{ ml: 4, mt: 1 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isPrimary}
                              onChange={(e) => setIsPrimary(e.target.checked)}
                            />
                          }
                          label="Set as primary shipping address"
                        />
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                          <Button variant="contained" onClick={handleUseThisAddress}>
                            Use This Address
                          </Button>
                          <Button variant="text" onClick={handleCancelSelect}>
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </Box>
                );
              })}
              <FormControlLabel
                value="new"
                control={
                  <Radio
                    checked={selectedAddressId === 'new'}
                    onChange={() => {
                      setSelectedAddressId('new');
                      handleAddNewAddress();
                    }}
                  />
                }
                label="Add New Address"
              />
            </Box>
          )}
        </Paper>

        {/* Gift Options Box */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Gift options
          </Typography>
          <Typography variant="body2">
            Write a gift message at Checkout and we’ll email it to the recipient when their item is shipped.
          </Typography>
        </Paper>

        {/* Contact Info Box */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Contact info
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Provide an email for order updates
          </Typography>
          <Typography variant="body2">Email: user@example.com</Typography>
          <Typography variant="body2">Phone: (123) 456-7890</Typography>
        </Paper>
      </Box>

      {/* Right Column: Review Order & Payment */}
      <Box sx={{ width: { xs: '100%', md: '300px' }, p: 2 }}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Review order
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Subtotal</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Shipping</Typography>
            <Typography>{subtotal >= 89 ? 'FREE' : '$9.95'}</Typography>
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
          {/* Replace the plain button with our Payment component */}
          <Payment
            cartItems={cartItems}
            totalAmount={total}
            onSuccess={(order) => {
              console.log('Payment successful, order:', order);
              // You can navigate to a success/confirmation page here
            }}
            onFailure={(message) => {
              console.error('Payment failed:', message);
            }}
          />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Nordstrom Cares
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
            Lorem ipsum donation or brand message ...
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small">$5</Button>
            <Button variant="outlined" size="small">$10</Button>
            <Button variant="outlined" size="small">$20</Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Checkout;
