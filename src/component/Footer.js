import React, { useState }  from 'react';
import { Avatar, Box,Button,CircularProgress,Container,IconButton,Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk');
  return response.data;
};



const Footer = () => {

  const { data = [], isLoading, error } = useQuery({
      queryKey: ['victoryborewellData'],
      queryFn: fetchData,
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });

  const [isClicked, setIsClicked] = useState(false);
    
  const handleScrollUp = () => {
    // Scroll to the top of the page with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',  // Smooth scroll
    });
  };
    


    
    
      const filteredData1 = data.filter((item) => item.Id === 12);
      const filteredData2 = data.filter((item) => item.Id === 13);
    


  return (
    <Box sx={{width:'100%',display:'flex',flexDirection:'column',backgroundColor:'#5e4c48', paddingTop:'20px',alignItems:'center'}}>
    <Box sx={{width:'85%',display:'flex',flexDirection:{xs:'column',md:'row'}, justifyContent:'center', padding:'20px 0',gap:'20px'}}>
           {filteredData1.map((item)=>(
      <Box sx={{width:{xs:'90%',md:'20%'}, display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <Avatar src={item.link} sx={{width:{xs:'150px',md:'120px'},height:{xs:'150px',md:'120px'},justifyContent:'center',alignItems:'center'}}/>       
        <Typography sx={{color:'white',fontWeight:'bold',fontSize:'20px'}}>{item.LabelText}</Typography>
        <Typography sx={{color:'white',fontSize:'13px'}}>{item.LabelText1}</Typography>
      </Box>
           ))}
      <Box sx={{width:{xs:'90%',md:'30%'},display:'flex',flexDirection:'column'}}>
        <Typography sx={{textAlign:'left',fontWeight:'bold',color:'white',fontSize:'20px'}}>About Us</Typography>
           {filteredData1.map((item)=>(

        <Typography style={{textAlign:'left',color:'white'}}>
          {item.Paragraph} 
          </Typography>
           ))}
      </Box>
      <Box sx={{width:{xs:'90%',md:'15%'},display:'flex',flexDirection:'column',gap:'8px'}}>
        <Typography sx={{fontWeight:'bold',textAlign:'left',color:'white',fontSize:'20px'}}>Link</Typography>
        <Link component={Link} to="/"  
          variant="h6" onClick={handleScrollUp} style={{
                                color:'white',textAlign:'left',textDecoration:'none','&:hover':{color:'#632c76',backgroundColor:'transparent'}}}>Home</Link>
          <Link component={Link} to="/about"            
          variant="h6" onClick={handleScrollUp} style={{
                                color:'white',textAlign:'left',textDecoration:'none','&:hover':{color:'#632c76',backgroundColor:'transparent'}}}>About</Link>

          <Link component={Link} to="/packages"
           variant="h6" onClick={handleScrollUp} style={{
                                color:'white',textAlign:'left',textDecoration:'none','&:hover':{color:'#632c76',backgroundColor:'transparent'}}}>Packages</Link>
          <Link component={Link} to="/contact"
           variant="h6" onClick={handleScrollUp} style={{
                                color:'white',textAlign:'left',textDecoration:'none','&:hover':{color:'#632c76',backgroundColor:'transparent'}}}>Contact</Link>
          <Link component={Link} to="/payment"
           variant="h6" onClick={handleScrollUp} style={{
                                color:'white',textAlign:'left',textDecoration:'none','&:hover':{color:'#632c76',backgroundColor:'transparent'}}}>Payment</Link>
      </Box>
           {filteredData1.map((item)=>(
      <Box sx={{width:{xs:'90%',md:'30%'},display:'flex',flexDirection:'column'}}>
        <Typography sx={{textAlign:'left',fontWeight:'bold',color:'white',fontSize:'20px'}}>Head Office</Typography>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <IconButton href={`tel:+91${item.Phone}`} color="white">
          <PhoneIcon sx={{color:'white'}}/>
        </IconButton>
        <Link href={`tel:+91${item.Phone}`} style={{marginTop:'9px', color:'white', textDecoration:'none'}}>
          +91 {item.Phone}
        </Link>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row'}}>
          <IconButton href={`mailto:${item.Email}`}>
          <EmailIcon sx={{color:'white'}}/>
        </IconButton>
        <Link href={`mailto:${item.Email}`} style={{ marginTop:'6px', color:'white', textDecoration:'none'}}>
          {item.Email}
        </Link>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row'}}>
          <IconButton
          href={item.Location}
          target="_blank"
          
        >
          <LocationOnIcon sx={{color:'white'}}/>
        </IconButton>
        <Link
          href={item.Location}
          target="_blank"
          style={{ color:'white', textAlign:'left' , textDecoration:'none'}}
        >
          {item.LabelText2}
        </Link>

        </Box>
      </Box>
           ))}
      <Box sx={{width:{xs:'90%',md:'30%'},display:'flex',flexDirection:'column',alignItems:'center'}}>
        <img src={logo} alt='logo' width='80px' />
      <Box sx={{display:'flex',flexWrap:'wrap', alignItems:'center',gap:'5px'}}>
           {filteredData2.map((item)=>(
        
        <IconButton
        component="a"
        href={item.mlink}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ padding: 1 }}
      >
        <img
          src={item.link} 
          alt="Social Media"
          style={{ width: 32, height: 32 }}
        />
      </IconButton>
           ))}
      </Box>
      </Box>
    </Box>
    <Box sx={{width:'100%',height:{sm:'70px',md:'50px'},display:'flex',backgroundColor:'#322826',justifyContent:'center',alignItems:'center',marginBottom:{xs:'45px',sm:'45px',md:'0px'}}}>
        <Typography sx={{display:'flex',justifyContent:'center',alignItems:'center',color:'white',fontSize:{xs:'13px'}}}>Copyright © 2025 Victory Borewells. All Rights Reserved.</Typography>
        
        </Box>
      </Box>
  );
};

export default Footer;