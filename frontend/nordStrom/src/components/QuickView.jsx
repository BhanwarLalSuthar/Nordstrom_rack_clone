import React, { useState } from 'react';
import SizeGuideModal from './SizeGuideModel';
import {
  Box,
  Typography,
  Modal,
  Backdrop,
  Fade,
  Rating,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/slices/cartSlice';
import { addWishlistItem } from '../redux/slices/wishlistSlice';
import { useNavigate } from 'react-router-dom';

const QuickViewModal = ({ product, open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  // Convert price strings to numbers for display (with fallback)
  const finalPrice = product.final_price || 0;
  const initialPrice = product.initial_price || 0;

  // Parse sizes and colors from comma-separated strings
  const sizeOptions = product.size ? product.size.split(',').map((s) => s.trim()) : [];
  const colorOptions = product.color ? product.color.split(',').map((c) => c.trim()) : [];

  // Local state for selected size and color
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || '');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0] || '');

  // State for the size guide modal
  const [openSizeGuide, setOpenSizeGuide] = useState(false);

  // Add to Cart
  const handleAddToCart = () => {
    dispatch(addCartItem({ product: product._id, quantity: 1 }));
  };

  // Add to Wishlist
  const handleAddToWishlist = () => {
    dispatch(addWishlistItem(product._id));
  };

  // Navigate to product detail page
  const handleSeeDetails = () => {
    onClose();
    navigate(`/product/${product._id}`);
  };

  // Stop propagation so clicks inside the modal content don't close it
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Main Quick View Modal */}
      <Modal
        open={open}
        onClose={onClose} 
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', md: '600px' },
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 3,
            }}
            onClick={onClose}
          >
            <Box onClick={handleContentClick} sx={{ position: 'relative' }}>
              {/* Close Icon */}
              <IconButton
                onClick={onClose}
                sx={{ position: 'absolute', top: 8, right: 8 }}
              >
                <CloseIcon />
              </IconButton>

              {/* Quick View Content */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                {/* Left side: image */}
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Box
                    component="img"
                    src={product.main_image || ''}
                    alt={product.product_name}
                    sx={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}
                  />
                </Box>

                {/* Right side: details */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {product.product_name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                    {product.brand || 'Unknown Brand'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body1" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                      {finalPrice}
                    </Typography>
                    {finalPrice !== initialPrice && (
                      <Typography
                        variant="body2"
                        sx={{ fontSize: '14px', color: '#666', textDecoration: 'line-through' }}
                      >
                        {initialPrice}
                      </Typography>
                    )}
                  </Box>
                  <Rating
                    value={Number(product.rating) || 0}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', mb: 2 }}>
                    ({product.reviews_count || 0} reviews)
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {product.description || 'No description available.'}
                  </Typography>

                  {/* Size & Color Selectors */}
                  {sizeOptions.length > 0 && (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="size-label">Size</InputLabel>
                      <Select
                        labelId="size-label"
                        value={selectedSize}
                        label="Size"
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        {sizeOptions.map((sz) => (
                          <MenuItem key={sz} value={sz}>
                            {sz}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {colorOptions.length > 0 && (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="color-label">Color</InputLabel>
                      <Select
                        labelId="color-label"
                        value={selectedColor}
                        label="Color"
                        onChange={(e) => setSelectedColor(e.target.value)}
                      >
                        {colorOptions.map((clr) => (
                          <MenuItem key={clr} value={clr}>
                            {clr}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {/* Buttons */}
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setOpenSizeGuide(true)}
                    >
                      Size Guide
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        onClose();
                        navigate(`/productdetail/${product._id}`);
                      }}
                    >
                      See Details
                    </Button>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleAddToCart}>
                      Add to Bag
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleAddToWishlist}>
                      Add to Wish List
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Render SizeGuideModal **within** the return so it mounts */}
      <SizeGuideModal open={openSizeGuide} onClose={() => setOpenSizeGuide(false)} />
    </>
  );
};

export default QuickViewModal;
