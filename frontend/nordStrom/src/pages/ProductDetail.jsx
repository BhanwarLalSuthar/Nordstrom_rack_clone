import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/slices/cartSlice';
import { addWishlistItem } from '../redux/slices/wishlistSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        const prod = response.data;
        setProduct(prod);
        setLoading(false);

        if (prod.image_urls && prod.image_urls.length > 0) {
          setMainImage(prod.image_urls[0]);
        } else {
          setMainImage(prod.main_image);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!product) {
    return (
      <Typography sx={{ mt: 4, textAlign: 'center' }}>
        Product not found.
      </Typography>
    );
  }

  // Convert price strings to numbers
  const finalPrice = product.final_price || 0;
  const initialPrice = product.initial_price || 0;

  // Parse sizes and colors
  const sizeOptions = product.size ? product.size.split(',').map((s) => s.trim()) : [];
  const colorOptions = product.color ? product.color.split(',').map((c) => c.trim()) : [];

  const images = product.image_urls?.length > 0
    ? product.image_urls
    : [product.main_image];

  const handleAddToCart = () => {
    dispatch(addCartItem({ product: product._id, quantity: 1 }));
  };

  const handleAddToWishlist = () => {
    dispatch(addWishlistItem(product._id));
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 4, px: 2 }}>
      {/* Top Section: Images + Basic Info */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Left Column: Thumbnails + Main Image */}
        <Box sx={{ flex: 1 }}>
          {images.length > 1 && (
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              {images.map((imgUrl, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={imgUrl}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setMainImage(imgUrl)}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    border: mainImage === imgUrl ? '2px solid #000' : '1px solid #ddd',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </Box>
          )}

          <Box
            component="img"
            src={mainImage}
            alt={product.product_name}
            sx={{
              width: '100%',
              objectFit: 'cover',
              border: '1px solid #ddd',
              maxHeight: { xs: '400px', md: '600px' },
            }}
          />
        </Box>

        {/* Right Column: Details */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            {product.product_name} ({product.brand})
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
            {product.root_category || 'Category not specified'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {finalPrice}
            </Typography>
            {finalPrice !== initialPrice && (
              <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#666' }}>
                {initialPrice}
              </Typography>
            )}
            {product.discount && (
              <Typography variant="body2" sx={{ color: '#ff0000' }}>
                {product.discount}% off
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={Number(product.rating) || 0} readOnly size="small" />
            <Typography variant="body2" sx={{ color: '#666' }}>
              ({product.reviews_count || 0} reviews)
            </Typography>
          </Box>

          {/* Size & Color */}
          {sizeOptions.length > 0 && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Size</InputLabel>
              <Select
                value={selectedSize}
                label="Size"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {sizeOptions.map((sz) => (
                  <MenuItem key={sz} value={sz}>{sz}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {colorOptions.length > 0 && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Color</InputLabel>
              <Select
                value={selectedColor}
                label="Color"
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {colorOptions.map((clr) => (
                  <MenuItem key={clr} value={clr}>{clr}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Shipping / Info (Placeholder) */}
          <Typography variant="body2" sx={{ mb: 2 }}>
            Free shipping on orders over $89. Some restrictions apply.
          </Typography>

          {/* Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              Add to Bag
            </Button>
            <Button variant="outlined" color="primary" onClick={handleAddToWishlist}>
              Add to Wish List
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Bottom Section: Description */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Product Description
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
        {product.description || 'No description available.'}
      </Typography>

      {/* Additional Two-Column Layout */}
      <Grid container spacing={4}>
        {/* Left Column: Size Info, Details & Care */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Size info
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Whole sizes only. For 1/2 sizes, order next size up.
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Details & care
          </Typography>
          {product.features && product.features.length > 0 ? (
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              {product.features.map((feature, idx) => (
                <li key={idx}>
                  <Typography variant="body2">{feature}</Typography>
                </li>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              No details available.
            </Typography>
          )}
        </Grid>

        {/* Right Column: Shipping & returns, Gift options, Brand info */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Shipping & returns
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            This item qualifies for free shipping on orders over $89.
            Shipping is $9.95 on most orders under $89. Exclusions apply for addresses
            to Alaska, Hawaii and Puerto Rico. Learn more about our
            <Button
              variant="text"
              color="primary"
              size="small"
              sx={{ textTransform: 'none', ml: 0.5, p: 0 }}
              onClick={() => window.open('https://www.nordstromrack.com/faq/shipping', '_blank')}
            >
              shipping & returns
            </Button>.
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Gift options
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Write a gift message at Checkout and we'll email it to the recipient when their item is shipped.
          </Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{ textTransform: 'none', mb: 2 }}
            onClick={() => window.open('https://www.nordstromrack.com/gifts', '_blank')}
          >
            Shop Gifts
          </Button>

          <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
            <strong>{product.brand || 'Brand Info'}</strong><br />
            When considering legendary Italian fashion house, {product.brand || 'this brand'} has come to
            mind for decades—renowned for {product.brand ? `${product.brand}'s` : 'its'} 
            luxury craftsmanship and iconic designs. Under the {product.brand || 'brand name'},
            you’ll discover high-quality pieces that exude artistry.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
