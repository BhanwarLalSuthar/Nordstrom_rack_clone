import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeWishlistItem } from '../redux/slices/wishlistSlice';
import { addCartItem } from '../redux/slices/cartSlice';
import AccountSidebar from '../components/AccountSideBar';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  FormControl,
  Select,
  Divider,
  Grid,
  Paper,
  FormControlLabel,
  Radio
} from '@mui/material';

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseFloat(String(priceStr).replace(/[^0-9.]/g, '')) || 0;
};

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems, status, error } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  // Local states for filter and sort
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('dateAdded');
  // Local state to instantly mark a product as added (for immediate UI update)
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (wishlistItemId) => {
    dispatch(removeWishlistItem(wishlistItemId));
  };

  const handleAddToBag = (productId) => {
    // Dispatch the action to add to cart
    dispatch(addCartItem({ product: productId, quantity: 1 }));
    // Immediately update local state to disable the button for this product
    setAddedToCart((prev) => ({ ...prev, [productId]: true }));
  };

  // Filter items
  const filteredItems = wishlistItems.filter((item) => {
    if (filter === 'inStock') {
      return item.product?.in_stock !== false;
    }
    return true;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    const prodA = a.product || {};
    const prodB = b.product || {};
    const priceA = parsePrice(prodA.final_price);
    const priceB = parsePrice(prodB.final_price);
    const discountA = parseFloat(prodA.discount) || 0;
    const discountB = parseFloat(prodB.discount) || 0;

    switch (sort) {
      case 'priceAsc':
        return priceA - priceB;
      case 'priceDesc':
        return priceB - priceA;
      case 'discount':
        return discountB - discountA;
      case 'dateAdded':
      default:
        const dateA = new Date(a.createdAt || a.timestamp || 0);
        const dateB = new Date(b.createdAt || b.timestamp || 0);
        return dateB - dateA;
    }
  });

  if (status === 'loading') return <Typography>Loading wishlist...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ display: 'flex', maxWidth: '95%', margin: 'auto' }}>
      <AccountSidebar />
      <Box sx={{ flex: 1, mt: 4, px: 2, p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Wish List ({sortedItems.length} items)
            </Typography>
            <Button variant="text" size="small" sx={{ textTransform: 'none', p: 0 }}>
              Create new list
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small">
              <Select value={filter} onChange={(e) => setFilter(e.target.value)} displayEmpty>
                <MenuItem value="all">Filters</MenuItem>
                <MenuItem value="inStock">In Stock</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small">
              <Select value={sort} onChange={(e) => setSort(e.target.value)} displayEmpty>
                <MenuItem value="dateAdded">Sort by date added</MenuItem>
                <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                <MenuItem value="discount">Sort by discount</MenuItem>
              </Select>
            </FormControl>
            <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
              Select All
            </Button>
            <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
              Share
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Wishlist Items */}
        {sortedItems.length === 0 ? (
          <Typography>Your wishlist is empty.</Typography>
        ) : (
          <Grid container spacing={2}>
            {sortedItems.map((item) => {
              const product = item.product || {};
              if (!product._id) return null;
              const priceNum = parsePrice(product.final_price);
              // Determine if the product is in cart using Redux OR if it was just added (local state)
              const isInCartFromRedux = cartItems.some(
                (cartItem) => String(cartItem.product._id) === String(product._id)
              );
              const isInBag = isInCartFromRedux || addedToCart[product._id];

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box
                      component="img"
                      src={product.main_image}
                      alt={product.product_name}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        border: '1px solid #ddd',
                        mb: 1,
                      }}
                    />
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      {product.product_name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      ${priceNum.toFixed(2)}
                    </Typography>
                    {product.discount && (
                      <Typography variant="body2" sx={{ color: '#ff0000' }}>
                        {product.discount}% off
                      </Typography>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                      {isInBag ? (
                        <Button variant="contained" disabled>
                          In Your Bag
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleAddToBag(product._id)}
                        >
                          Add to Bag
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleRemove(item._id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Wishlist;
