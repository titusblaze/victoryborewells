import { Avatar, Box, CircularProgress, Container, Typography } from '@mui/material'
import React from 'react'
import ImageSlider from './ImageSlider'
import Gallery from './Gallery'
import GoogleReview from './GoogleReview'
import AutoNumberRunning from '../AutoNumberRunning'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk');
  return response.data;
};

const Home = () => {
   const { data = [], isLoading, error } = useQuery({
      queryKey: ['borewellData'],
      queryFn: fetchData,
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });
    // Handle loading and error
  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">Failed to fetch data.</Typography>
      </Container>
    );
  }

  const filteredData = data.filter((item) => item.Id === 22);
  return (
    <Box>
        <ImageSlider/>
        <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyItems:'center',padding:'60px 0'}}>
        <Typography sx={{fontSize:{xs:'30px',md:'50px'}}}>About Us</Typography>
        {filteredData.map((item) => (
        <Box sx={{width:{xs:'95%',md:'85%'},display:'flex',flexDirection:{xs:'column',md:'row'},alignItems:'center',justifyItems:'center',gap:'30px'}}>
        <p style={{textAlign:'left'}}>{item.LabelText}</p>
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