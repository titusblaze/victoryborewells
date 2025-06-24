import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const slides = [
  {
    image: 'https://i.im.ge/2025/06/21/JOeJ74.Borewell1.jpeg',
    text: 'Welcome to Our Services',
  },
  {
    image: 'https://i.im.ge/2025/06/21/JOenCC.Borewell2.jpeg',
    text: 'Quality Borewell Solutions',
  },
  {
    image: 'https://i.im.ge/2025/06/21/JOe4vq.Borewell3.jpeg',
    text: 'Contact Us for Consultation',
  },
  {
    image: 'https://i.im.ge/2025/06/24/J2v7Hx.BorewellVehicle.jpeg',
  },
];

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box id="banner"
    sx={{  width:'100%',
                display:'flex',
                flexDirection:'column',
                
                }}>
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: {xs:'auto',md:'100vh'},
        backgroundImage: `url(${slides[currentSlide].image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
       // alignItems: 'center',
        color: 'white',
        marginTop:{
                        xs:'60px',
                        md:'80px',
                          },
        transition: 'background-image 1s ease-in-out',
      }}
    >
        <Box sx={{ width:'90%',display:'flex', flexDirection:'column-reverse',paddingBottom:'150px'}}>
      <Typography 
      sx={{textAlign:'left',
      bottom:'50%', 
      fontSize:{xs:'20px',md:'70px'}, 
      fontWeight: 'bold', 
      paddingTop:'20px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
        {slides[currentSlide].text}
      </Typography>
      </Box>

      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
        }}
      >
        <ChevronRight />
      </IconButton>
      
    </Box>
    </Box>
  );
};

export default ImageSlider;
