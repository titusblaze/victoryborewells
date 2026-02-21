import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
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

  const { data = [] } = useQuery({
    queryKey: ['victoryborewellData'],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
  });

  /* Slider Image Filter */
  const filteredData = data.filter((item) => item.Id === 2);

  /* WhatsApp Phone From Row ID = 12 */
  const whatsappPhone = data.find((item) => item.Id === 12)?.Phone;

  const [currentSlide, setCurrentSlide] = useState(0);

  /* Modal State */
  const [open, setOpen] = useState(false);

  /* Form States */
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  /* Auto Slide */
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
      filteredData.length > 0
        ? (prev - 1 + filteredData.length) % filteredData.length
        : 0
    );
  };

  /* WhatsApp Submit */
  const handleSubmit = () => {

    const text =
      `Booking Request%0A` +
      `Name: ${name}%0A` +
      `Area: ${area}%0A` +
      `Mobile: ${mobile}%0A` +
      `Message: ${message}`;
    const phoneNumber = `+91${whatsappPhone}`; // Your WhatsApp number (with country code)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

    window.open(whatsappUrl, '_blank');

    setOpen(false);
  };

  return (
    <Box id="banner" sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* SLIDER CONTAINER */}
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

                    {/* BOOK NOW BUTTON INSIDE SLIDER */}
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            position: 'absolute',
            bottom: { xs: 15, md: 40 },
            right: { xs: 15, md: 40 },
            zIndex: 3,
            borderRadius: '30px',
            padding: { xs: '8px 16px', md: '12px 25px' },
            fontWeight: 'bold',
            backgroundColor: '#ff6a00',
            '&:hover': { backgroundColor: '#e65c00' },
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}
        >
          BOOK NOW
        </Button>

                </Box>

        {/* LEFT ARROW */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            color: 'white',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 2
          }}
        >
          <ChevronLeft />
        </IconButton>

        {/* RIGHT ARROW */}
        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            color: 'white',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 2
          }}
        >
          <ChevronRight />
        </IconButton>

        

      </Box>

      {/* MODAL FORM */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Book Borewell</DialogTitle>

        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Area"
            fullWidth
            margin="normal"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />

          <TextField
            label="Mobile"
            fullWidth
            margin="normal"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <TextField
            label="Message"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default ImageSlider;