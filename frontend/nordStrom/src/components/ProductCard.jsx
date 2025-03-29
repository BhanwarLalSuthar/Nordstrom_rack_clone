import React, { useState } from 'react';
import { Box, Typography, Paper, Rating } from '@mui/material';

const ProductCard = ({ product, onClick }) => {
  // image_urls array
  const images = product.image_urls || [];
  // We start by displaying the first image (or a placeholder if none)
  const [displayedImage, setDisplayedImage] = useState(images[0] || 'https://via.placeholder.com/300x400');

  // parse numeric prices
  const finalPriceNum = parseFloat(String(product.final_price).replace(/[^0-9.]/g, '')) || 0;
  const initialPriceNum = parseFloat(String(product.initial_price).replace(/[^0-9.]/g, '')) || 0;
  // discount
  const discount = product.discount || 0;
  // rating
  const ratingVal = product.rating == null ? null : parseFloat(product.rating);
  // color array
  const colorArray = product.color ? product.color.split(',') : [];

  // On mouse leave from color swatch, revert to the default image (index 0)
  const handleColorMouseLeave = () => {
    setDisplayedImage(images[0] || 'https://via.placeholder.com/300x400');
  };

  return (
    <Paper
      onClick={onClick}
      sx={{
        p: 2,
        cursor: 'pointer',
        '&:hover': { boxShadow: 3 },
      }}
    >
      <Box
        component="img"
        src={displayedImage}
        alt={product.product_name}
        sx={{ width: '100%', height: 300, objectFit: 'cover', mb: 1 }}
      />

      {/* Brand */}
      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
        {product.brand || 'Brand'}
      </Typography>

      {/* Product Name */}
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        {product.product_name}
      </Typography>

      {/* Color Circles */}
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        {colorArray.map((clr, index) => (
          <Box
            key={index}
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              border: '1px solid #ddd',
              bgcolor: 'grey',
            }}
            title={clr.trim()}
            onMouseEnter={() => {
              // If image_urls[index] exists, show that image
              if (images[index]) {
                setDisplayedImage(images[index]);
              }
            }}
            onMouseLeave={handleColorMouseLeave}
          />
        ))}
      </Box>

      {/* Price + Discount */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          ${finalPriceNum.toFixed(2)}
        </Typography>
        {discount > 0 && (
          <>
            <Typography
              variant="body2"
              sx={{ textDecoration: 'line-through', color: '#999' }}
            >
              ${initialPriceNum.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'red' }}>
              ({discount}% off)
            </Typography>
          </>
        )}
      </Box>

      {/* Rating & Reviews */}
      {ratingVal != null && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
          <Rating value={ratingVal} precision={0.5} readOnly size="small" />
          <Typography variant="body2" sx={{ color: '#666' }}>
            ({product.reviews_count || 0})
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ProductCard;
