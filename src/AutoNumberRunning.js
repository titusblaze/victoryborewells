import React, { useState, useEffect } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmergencyIcon from '@mui/icons-material/Emergency';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const countersData = [
  { id: 1, icon: <FaceRetouchingNaturalIcon fontSize="large" />, label: "Year of Experience", target: 30 },
  { id: 2, icon: <ThumbUpIcon fontSize="large" />, label: "Successful Spots", target: 3990 },
  { id: 3, icon: <EmergencyIcon fontSize="large" />, label: "Successfull Risk Spots", target: 260 },
  { id: 4, icon: <VolunteerActivismIcon fontSize="large" />, label: "Years of Service and Cleaning", target: 1500 },
];

const Counter = ({ icon, label, target }) => {
  const [value, setValue] = useState(0);

 


  useEffect(() => {
    const increment = () => {
      setValue((prevValue) => {
        if (prevValue < target) {
          setTimeout(increment, 100); // Adjust speed here
          return prevValue + 1;
        }
        return prevValue; // Stop incrementing when target is reached
      });
    };
    increment();
  }, [target]);


  return (
    <Box
      sx={{
        width: {xs: '75%', md: '17%'},
        textAlign: "center",
        boxShadow: 3,
        borderRadius: 2,
        padding: 2,
        backgroundColor: "#fff",
      }}
    >
      <Box>
        {icon}
        <Typography variant="h4" color="textPrimary" gutterBottom>
          {value}+
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {label}
        </Typography>
      </Box>
    </Box>

  )
}
const AutoNumberRunning = () => {

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 0px' }}>
      <Box sx={{ width: {xs: '90%', md: '80%'}, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2', padding: '40px 0px' }}>
        <Typography variant='h4' sx={{ fontSize: {xs: '30px', md: '40px'}, color: '#333232' }}>Our Strength</Typography>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: {xs: 'column', md : 'row'}, gap: '30px', justifyContent: 'center', alignItems: 'center', padding: '40px 0px' }}>
          {countersData.map((counter) => (
            <Counter
              key={counter.id}
              icon={counter.icon}
              label={counter.label}
              target={counter.target}
            />
          ))}
        </Box>
      </Box>
      
    </Box>
  )
}

export default AutoNumberRunning