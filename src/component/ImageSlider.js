import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Container, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get(
    'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk'
  );
  return response.data;
};

const ImageSlider = () => {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['victoryborewellData'],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
  });

  // Filter first
  const filteredData = data.filter((item) => item.Id === 2);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Change slide automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        filteredData.length > 0 ? (prev + 1) % filteredData.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      filteredData.length > 0 ? (prev + 1) % filteredData.length : 0
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      filteredData.length > 0 ? (prev - 1 + filteredData.length) % filteredData.length : 0
    );
  };

  return (
    <Box id="banner" sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 'auto', md: '100vh' },
          backgroundImage: `url(${filteredData[currentSlide]?.link})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          color: 'white',
          marginTop: { xs: '60px', md: '80px' },
          transition: 'background-image 1s ease-in-out',
        }}
      >
        <Box sx={{ width: '90%', display: 'flex', flexDirection: 'column-reverse', paddingBottom: '150px' }}>
          <Typography
            sx={{
              textAlign: 'left',
              fontSize: { xs: '20px', md: '70px' },
              fontWeight: 'bold',
              paddingTop: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            }}
          >
            {filteredData[currentSlide]?.LabelText}
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
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
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
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImageSlider;
