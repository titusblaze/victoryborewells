import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery
} from "@mui/material";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmergencyIcon from '@mui/icons-material/Emergency';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get(
    'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk'
  );
  return response.data;
};

// Array for icons only
const iconData = [
  <FaceRetouchingNaturalIcon fontSize="large" />,
  <ThumbUpIcon fontSize="large" />,
  <EmergencyIcon fontSize="large" />,
  <VolunteerActivismIcon fontSize="large" />,
];


const Counter = ({ icon, label, target }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let interval;
    if (value < target) {
      interval = setInterval(() => {
        setValue((prev) => {
          if (prev < target) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 20); // Adjust speed
    }
    return () => clearInterval(interval);
  }, [value, target]);

  return (
    <Box
      sx={{
        width: { xs: '75%', md: '17%' },
        textAlign: "center",
        boxShadow: 3,
        borderRadius: 2,
        padding: 2,
        backgroundColor: "#fff",
      }}
    >
      {icon}
      <Typography variant="h4" color="textPrimary" gutterBottom>
        {value}+
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {label}
      </Typography>
    </Box>
  );
};

const AutoNumberRunning = () => {
  const { data = [], isLoading, error } = useQuery({
      queryKey: ['victoryborewellData'],
      queryFn: fetchData,
      staleTime: 1000 * 60 * 5,
    });
  
    const filteredData = data.filter((item) => item.Id === 6);
    // Loading state
  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  // Error state
  if (error || filteredData.length === 0) {
    return (
      <Container>
        <Typography color="error">Failed to fetch or no data available.</Typography>
      </Container>
    );
  }
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 0px'
    }}>
      <Box sx={{
        width: { xs: '90%', md: '80%' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: '40px 0px'
      }}>
        <Typography variant='h4' sx={{ fontSize: { xs: '30px', md: '40px' }, color: '#333232' }}>
          Our Strength
        </Typography>

        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '30px',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 0px'
        }}>
          {filteredData.map((item, index) => (
            <Counter
              key={item.id}
              icon={iconData[index]}
              label={item.LabelText}
              target={item.Target}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AutoNumberRunning;
