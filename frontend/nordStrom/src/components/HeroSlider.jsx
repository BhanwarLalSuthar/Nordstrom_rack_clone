import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom arrow components for navigation
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        bgcolor: '#1976d2',
        color: 'white',
        '&:hover': { bgcolor: '#1565c0' },
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
        right: '10px',
        top: '50%',
        transform: 'translateY(-10%)',
        zIndex: 1,
        bgcolor: '#1976d2',
        color: 'white',
        '&:hover': { bgcolor: '#1565c0' },
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

const HeroSlider = () => {
  const navigate = useNavigate();

  // Slider settings for react-slick
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // Sample slide data (replace with your own images)
  const slides = [
    {
      image: 'https://n.nordstrommedia.com/it/16684fa1-bd03-450a-a8a4-d348bb7d0bd4.jpeg?h=720&w=1608',
      
      link: '/dresses',
    },
    {
      image: 'https://n.nordstrommedia.com/it/553ab505-6370-41db-ac07-4c5dac56f182.jpeg?h=720&w=1608',
     
      link: '/shoes',
    },
    {
      image: 'https://n.nordstrommedia.com/it/814e2f52-0d6a-4209-93a3-0f47beafcecd.jpeg?h=720&w=1608',
      
      link: '/accessories',
    },
  ];

  return (
    <Box sx={{ position: 'relative', width: '97%', overflow: 'hidden', margin: 'auto' }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ position: 'relative', height: '650px' }}>
            {/* Background Image */}
            <Box
              component="img"
              src={slide.image}
              sx={{
                width: '100%',
                height: '100%',
                margin: "auto",
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />

            {/* Overlay Text and Button */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '10%',
                transform: 'translateY(-50%)',
                color: '#000',
              }}
            >
             
              <Button
                variant="text"
                onClick={() => navigate(slide.link)}
                sx={{
                  color: '#000',
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 'light',
                  textDecoration: 'underline',
                  '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' },
                }}
              >
                Shop Now
              </Button>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroSlider;