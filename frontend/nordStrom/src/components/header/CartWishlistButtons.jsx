import React from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartWishlistButtons = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  // If you want to show total quantity (e.g., 9 if you have 9 total items):
  // const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // If you want to show the number of distinct products in the cart (e.g., 2 products):
  const cartCount = cartItems.length;

  // Wishlist count is just the number of items
  const wishlistCount = wishlistItems.length;

  return (
    <>
      <IconButton color="inherit" onClick={() => navigate('/cart')}>
        <Badge badgeContent={cartCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton color="inherit" onClick={() => navigate('/wishlist')}>
        <Badge badgeContent={wishlistCount} color="error">
          <FavoriteIcon />
        </Badge>
      </IconButton>
    </>
  );
};

export default CartWishlistButtons;
