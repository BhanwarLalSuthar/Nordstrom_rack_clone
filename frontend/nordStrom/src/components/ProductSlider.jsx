import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Typography, IconButton, Rating, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axiosInstance from '../api/axiosInstance';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import QuickViewModal from './QuickView';

// Custom arrow components for navigation
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        left: '-20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        color: 'blue',
        '&:hover': { color: 'white', backgroundColor: '#1976d2' },
      }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        right: '-20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        color: 'blue',
        '&:hover': { color: 'white', backgroundColor: '#1976d2' },
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

const ProductSlider = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data.slice(0, 24));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 5,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 5.5 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 4.5 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2.5 },
      },
    ],
  };

  return (
    <Box sx={{ position: 'relative', width: '96%', maxWidth: '1400px', mx: 'auto', py: 4 }}>
      <Slider {...settings}>
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </Slider>
    </Box>
  );
};

// Product Card Component with Hover Functionality
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  // Prepare images: if image_urls is provided, map them; otherwise fallback to main_image.
  const images =
    product.image_urls && product.image_urls.length > 0
      ? product.image_urls.map((url) => ({ color: '#000', url }))
      : [{ color: '#000', url: product.main_image }];

  const [selectedImage, setSelectedImage] = useState(images[0].url); // Initially selected image
  const [hoverImage, setHoverImage] = useState(null); // Image to show on hover

  // Use hoverImage if it exists, otherwise use selectedImage
  const displayedImage = hoverImage || selectedImage;

  // Convert price strings to numbers for display (with fallback)
  const finalPrice = product.final_price || 0;
  const initialPrice = product.initial_price || 0;
  console.log(finalPrice, initialPrice)

  // Quick View modal state
  const [openQuickView, setOpenQuickView] = useState(false);
  const handleOpenQuickView = (e) => {
    e.stopPropagation();
    setOpenQuickView(true);
  };
  const handleCloseQuickView = () => setOpenQuickView(false);
  
  const handleCardClick = () => {
    // If quick view is open, don't navigate
    if (openQuickView) return;
    navigate(`/productdetail/${product._id}`);
  };

  return (<>
  
    <Box
      sx={{
        p: 1,
        cursor: 'pointer',
        '&:hover': { transform: 'translateY(-4px)',
           transition: 'transform 0.2s',
           // Show the Quick View button on hover
          '.quick-view-button': {
            display: 'block',
          },
        },
      }}
      onClick={() => navigate(`/productdetail/${product._id || product.id}`)}
    >
      {/* Product Image */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%', // 1:1 aspect ratio
          bgcolor: '#f5f5f5',
        }}
        >
        <Box
          component="img"
          src={displayedImage}
          alt={product.product_name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Quick View Button */}
        <Button
            variant="contained"
            size="small"
            onClick={handleOpenQuickView}
            sx={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              display: 'none',
              ':hover': { backgroundColor: '#1976d2' },
            }}
            className="quick-view-button"
          >
            Quick View
          </Button>
        { (product.isNew || product.isMarkdown) && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              bgcolor: product.isNew ? '#000' : '#ff0000',
              color: 'white',
              px: 1,
              py: 0.5,
              fontSize: '12px',
              fontWeight: 'bold',
            }}
            >
            {product.isNew ? 'New!' : 'Markdown'}
          </Box>
        )}
      </Box>

      {/* Color Selector */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              bgcolor: image.color,
              border: '1px solid #ddd',
              mx: 0.5,
              cursor: 'pointer',
              '&:hover': { border: '1px solid #000' },
              ...(selectedImage === image.url && { border: '2px solid #000' }),
            }}
            onMouseEnter={() => setHoverImage(image.url)}
            onMouseLeave={() => setHoverImage(null)}
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigating to product page on color click
              setSelectedImage(image.url);
              setHoverImage(null);
            }}
          />
        ))}
      </Box>

      {/* Product Details */}
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2" sx={{ fontSize: '12px', color: '#666' }}>
          Popular
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
          {product.product_name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
            {finalPrice}
          </Typography>
          {finalPrice !== initialPrice && (
            <Typography
              variant="body2"
              sx={{ fontSize: '12px', color: '#666', textDecoration: 'line-through' }}
              >
              {initialPrice}
            </Typography>
          )}
        </Box>
        {product.discount && (
          <Typography variant="body2" sx={{ fontSize: '12px', color: '#ff0000' }}>
            {product.discount}%
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating value={Number(product.rating) || 0} precision={0.5} readOnly size="small" />
          <Typography variant="body2" sx={{ fontSize: '12px', color: '#666' }}>
            ({product.reviews_count || 0})
          </Typography>
        </Box>
      </Box>
    </Box>
      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        open={openQuickView}
        onClose={handleCloseQuickView}
      />
  </>
  );
};

export default ProductSlider;
