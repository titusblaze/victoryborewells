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
    'https://script.google.com/macros/s/AKfycbz7UciPAZXCSdbKjIk8G6ga9xG0-4Of-2vPxwQM8mzVd0C0X-3Aza-e8Ft3FZSTKLj1/exec'
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
