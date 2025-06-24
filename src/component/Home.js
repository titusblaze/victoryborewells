import { Box, Typography } from '@mui/material'
import React from 'react'
import ImageSlider from './ImageSlider'
import Gallery from './Gallery'
import AutoNumberRunning from ',/AutoNumberRunning'
import GoogleReview from './GoogleReview'
import Footer from './Footer'

const Home = () => {
  return (
    <Box>
        <ImageSlider/>
        <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyItems:'center',padding:'60px 0'}}>
        <Typography sx={{fontSize:{xs:'30px',md:'50px'}}}>About Us</Typography>
        <Box sx={{width:{xs:'95%',md:'85%'},display:'flex',flexDirection:{xs:'column',md:'row'},alignItems:'center',justifyItems:'center',gap:'30px'}}>
        <p>We are a trusted borewell drilling company with years of expertise in 
            providing reliable and efficient water well solutions. Specializing in residential, 
            agricultural, and industrial borewell services, we use advanced machinery to ensure 
            precise and timely work. Customer satisfaction and safety are our top priorities. 
            Our team of skilled professionals is committed to delivering quality service tailored 
            to your location and water needs. Choose us for dependable and long-lasting borewell solutions.</p>
        <Avatar src='https://i.im.ge/2025/06/21/JOepeD.Rajapandian.jpeg' 
        sx={{width:{xs:'150px',md:'120px'},height:{xs:'150px',md:'120px'},justifyContent:'center',alignItems:'center'}}/>
        </Box>
        </Box>
        <Gallery/>
        <AutoNumberRunning/>
        <GoogleReview/>
        <Footer/>
    </Box>
  )
}

export default Home