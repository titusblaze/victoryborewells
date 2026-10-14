import { Avatar, Box, CircularProgress, Container, Typography } from '@mui/material'
import React from 'react'
import ImageSlider from './ImageSlider'
import Gallery from './Gallery'
import GoogleReview from './GoogleReview'
import AutoNumberRunning from '../AutoNumberRunning'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('https://script.google.com/macros/s/AKfycbz7UciPAZXCSdbKjIk8G6ga9xG0-4Of-2vPxwQM8mzVd0C0X-3Aza-e8Ft3FZSTKLj1/exec');
  return response.data;
};

const Home = () => {
   const { data = [], isLoading, error } = useQuery({
      queryKey: ['borewellData'],
      queryFn: fetchData,
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });

  const filteredData = data.filter((item) => item.Id === 22);
  return (
    <Box>
        <ImageSlider/>
        <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyItems:'center',padding:'60px 0'}}>
        <Typography sx={{fontSize:{xs:'30px',md:'50px'}}}>About Us</Typography>
        {filteredData.map((item) => (
        <Box sx={{width:{xs:'90%',md:'85%'},display:'flex',flexDirection:{xs:'column',md:'row'},alignItems:'center',justifyItems:'center',gap:'30px'}}>
        <p style={{textAlign:'justify'}}>{item.LabelText}</p>
        <Avatar src={item.link} 
        sx={{width:{xs:'150px',md:'120px'},height:{xs:'150px',md:'120px'},justifyContent:'center',alignItems:'center'}}/>
        </Box>
        ))}
        </Box>
        <Gallery/>
        <AutoNumberRunning/>
        <GoogleReview/>
    </Box>
  )
}

export default Home