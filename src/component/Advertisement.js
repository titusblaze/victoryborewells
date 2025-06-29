import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk');
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