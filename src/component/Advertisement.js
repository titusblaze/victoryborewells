import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('https://script.google.com/macros/s/AKfycbz7UciPAZXCSdbKjIk8G6ga9xG0-4Of-2vPxwQM8mzVd0C0X-3Aza-e8Ft3FZSTKLj1/exec');
  return response.data;
};

const Advertisement = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['victoryborewellData'],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setOpen(true), 2000);       // Show after 2 seconds
    const hide = setTimeout(() => setOpen(false), 300000);     // Hide after 300 seconds
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  const filteredData = data.filter(item => item.Id === 19);

  if (!filteredData.length) return null;

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 300,
          bgcolor: '#fff',
          boxShadow: 6,
          borderRadius: 2,
          p: 2,
          zIndex: 9999,
        }}
      >
        <IconButton
          size="small"
          onClick={() => setOpen(false)}
          sx={{ position: 'absolute', top: 4, right: 4 }}
        >
          <CloseIcon />
        </IconButton>

        {filteredData.map((item, idx) => (
          <Box key={idx}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              📢 {item.LabelText}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {item.LabelText1}
            </Typography>
            <a href={`tel:+91${item.Phone}`}>
              <img
                src={item.link}
                alt="Ad"
                width="100%"
                style={{ borderRadius: '8px', cursor: 'pointer' }}
              />
            </a>
          </Box>
        ))}
      </Box>
    </Slide>
  );
};

export default Advertisement;