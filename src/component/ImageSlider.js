import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const slides = [
  {
    image: 'https://5.imimg.com/data5/EQ/TV/CE/SELLER-901529/borewell-drilling-rig-500x500.jpg',
    text: 'Welcome to Our Services',
  },
  {
    image: 'https://img77.uenicdn.com/image/upload/v1547216634/service_images/shutterstock_719795347.jpg',
    text: 'Quality Borewell Solutions',
  },
  {
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEjW2X0KQ-nQJkqKKTxUu6HbItFUYAeVY5UkTI8HCoUIt5xKvF3ADlmeXBOG73dvS-S1bznVj3s8SXCDZVt28iuor55_c0F-xG0PjR-o9O6H70urwV9QG21YNhnsafcHcQObLkBF-tcl2sOSvKoizdXdu5AME7yrlNSMtbmjn3AfEjhI8fHhPi2op0rv-Q=s16000',
    text: 'Contact Us for Consultation',
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
