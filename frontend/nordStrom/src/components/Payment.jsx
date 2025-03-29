// src/components/Payment.jsx
import React from 'react';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createRazorpayOrder, verifyPayment, clearPaymentState } from '../redux/slices/paymentSlice';
import { clearCart, fetchCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Payment = ({ cartItems, totalAmount, onSuccess, onFailure }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, verifyStatus, verifyError } = useSelector((state) => state.payment);

  const handlePayNow = async () => {
    try {
      // Prepare order data: ensure price is numeric and totalAmount is correct
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
          price: parseFloat(String(item.product.final_price).replace(/[^0-9.]/g, '')),
        })),
        totalAmount,
      };

      // Create order in backend
      const createResult = await dispatch(createRazorpayOrder(orderData)).unwrap();

      // Set up Razorpay checkout options
      const options = {
        key: "rzp_test_LxCAR6NaAPk9gU", // your Razorpay key id from env
        amount: createResult.amount, // in smallest unit (cents/paise)
        currency: createResult.currency,
        order_id: createResult.orderId,
        name: 'Your Store Name',
        description: 'Order Payment',
        handler: async (response) => {
          try {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
            const verifyResult = await dispatch(verifyPayment(verifyPayload)).unwrap();
            if (verifyResult.success) {
              // Clear the cart and payment state
              dispatch(clearCart());
              dispatch(clearPaymentState());
              // Call success callback (if any) and redirect to Purchases page
              // 3a) If storing cart in local storage, remove it:
            localStorage.removeItem('cartItems');

            // 4) Optionally re-fetch cart to confirm it's empty
            dispatch(fetchCart());

              onSuccess && onSuccess(verifyResult.order);
              navigate('/purchases');
            } else {
              onFailure && onFailure('Payment verification failed');
            }
          } catch (err) {
            console.error('Payment verification error:', err);
            onFailure && onFailure(err.message);
          }
        },
        prefill: {
          name: '',    // Optionally prefill customer details
          email: '',
          contact: '',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Error creating order:', err);
      onFailure && onFailure(err.message);
    }
  };

  if (status === 'loading' || verifyStatus === 'loading') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={24} />
        <Typography>Processing payment...</Typography>
      </Box>
    );
  }

  if (error || verifyError) {
    return <Typography color="error">{error || verifyError}</Typography>;
  }

  return (
    <Button variant="contained" color="primary" onClick={handlePayNow}>
      Pay Now
    </Button>
  );
};

export default Payment;
