import React, { useState }  from 'react';
import { Avatar, Box,Button,IconButton,Link,Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from '../assets/logo.png';


const Footer = () => {

  const [isClicked, setIsClicked] = useState(false);
    const scrollToTopicBanner = () => {
      setIsClicked(true); // Toggle click state <a>
      // Find the target section by ID and scroll to it
      const targetSection = document.getElementById("banner");
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth', // Smooth scroll
          block: 'start',     // Align to the top of the section
        });
      }
    };
    const scrollToTopicAbout = () => {
      setIsClicked(true); // Toggle click state <a>
      // Find the target section by ID and scroll to it
      const targetSection = document.getElementById("about");
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth', // Smooth scroll
          block: 'start',     // Align to the top of the section
        });
      }
    };
    const scrollToTopicPackages = () => {
      setIsClicked(true); // Toggle click state <a>
      // Find the target section by ID and scroll to it
      const targetSection = document.getElementById("packages");
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth', // Smooth scroll
          block: 'start',     // Align to the top of the section
        });
      }
    };
    const scrollToTopicServices = () => {
      setIsClicked(true); // Toggle click state <a>
      // Find the target section by ID and scroll to it
      const targetSection = document.getElementById("services");
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth', // Smooth scroll
          block: 'start',     // Align to the top of the section
        });
      }
    };
    const scrollToTopicContact = () => {
      setIsClicked(true); // Toggle click state <a>
      // Find the target section by ID and scroll to it
      const targetSection = document.getElementById("contact");
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth', // Smooth scroll
          block: 'start',     // Align to the top of the section
        });
      }
    };
    


  return (
    <Box sx={{width:'100%',display:'flex',flexDirection:'column',backgroundColor:'#5e4c48', paddingTop:'20px',alignItems:'center'}}>
    <Box sx={{width:'85%',display:'flex',flexDirection:{xs:'column',md:'row'}, justifyContent:'center', padding:'20px 0',gap:'20px'}}>
      <Box sx={{width:{xs:'90%',md:'20%'}, display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <Avatar src='https://drive.google.com/file/d/1HS8qH932eKV1XsxYcRLa4CEjOCFz1Ubm/view?usp=sharing' sx={{width:{xs:'150px',md:'120px'},height:{xs:'150px',md:'120px'},justifyContent:'center',alignItems:'center'}}/>       
        <Typography sx={{color:'white',fontSize:'15px'}}>Founder</Typography>
        <Typography sx={{color:'white',fontWeight:'bold'}}>Rajapandian</Typography>
      </Box>
      <Box sx={{width:{xs:'90%',md:'30%'},display:'flex',flexDirection:'column'}}>
        <Typography sx={{textAlign:'left',fontWeight:'bold',color:'white'}}>About Us</Typography>
        <Typography style={{textAlign:'left',color:'white'}}>Established in 2015, Victory Borewell has been a trusted provider of borewell drilling services, 
          specializing in delivering reliable water solutions across Thoothukudi & Tirunelveli District Location Satankulam. 
          </Typography>
      </Box>
      <Box sx={{width:{xs:'90%',md:'15%'},display:'flex',flexDirection:'column'}}>
        <Typography sx={{fontWeight:'bold',textAlign:'left',color:'white'}}>Link</Typography>
        <Link onClick={scrollToTopicBanner} 
          variant="h6" sx={{color:'white',textAlign:'left', fontSize:'15px', textDecoration:'none',
                                '&:hover':{color:'blue',backgroundColor:'transparent'}}}>
                                  Home
                                  </Link>
        <Link onClick={scrollToTopicAbout} 
          variant="h6" sx={{color:'white',textAlign:'left', fontSize:'15px', textDecoration:'none',
                                '&:hover':{color:'blue',backgroundColor:'transparent'}}}>
                                  About
                                  </Link>
        <Link onClick={scrollToTopicPackages} 
          variant="h6" sx={{color:'white',textAlign:'left', fontSize:'15px', textDecoration:'none',
                                '&:hover':{color:'blue',backgroundColor:'transparent'}}}>
                                  Packages
                                  </Link>
        <Link onClick={scrollToTopicServices} 
          variant="h6" sx={{color:'white',textAlign:'left', fontSize:'15px', textDecoration:'none',
                                '&:hover':{color:'blue',backgroundColor:'transparent'}}}>
                                  Services
                                  </Link>
        <Link onClick={scrollToTopicContact} 
          variant="h6" sx={{color:'white',textAlign:'left', fontSize:'15px', textDecoration:'none',
                                '&:hover':{color:'blue',backgroundColor:'transparent'}}}>
                                  Contact Us
                                  </Link>
      </Box>
      <Box sx={{width:{xs:'90%',md:'25%'},display:'flex',flexDirection:'column'}}>
        <Typography sx={{textAlign:'left',fontWeight:'bold',color:'white'}}>Contact Us</Typography>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <IconButton href="tel:+919788112233" color="white">
          <PhoneIcon sx={{color:'white'}}/>
        </IconButton>
        <Link href="tel:+919788112233" sx={{marginTop:'9px', color:'white'}}>
          +91 97881 12233
        </Link>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row'}}>
          <IconButton href="mailto:info@example.com">
          <EmailIcon sx={{color:'white'}}/>
        </IconButton>
        <Link href="mailto:info@example.com" sx={{ marginTop:'9px', color:'white'}}>
          info@example.com
        </Link>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row'}}>
          <IconButton
          href="https://maps.app.goo.gl/8smHNCg28wwgX6yV8"
          target="_blank"
          
        >
          <LocationOnIcon sx={{color:'white'}}/>
        </IconButton>
        <Link
          href="https://maps.app.goo.gl/8smHNCg28wwgX6yV8"
          target="_blank"
          sx={{ color:'white', textAlign:'left' }}
        >
          Nazareth Main Rd, opp. State bank of india, Sathankulam, Tamil Nadu - 628 704
        </Link>

        </Box>
      </Box>
      <Box sx={{width:{xs:'90%',md:'30%'},display:'flex',flexDirection:'column',alignItems:'center'}}>
        <img src={logo} alt='logo' width='100px' />
      <Box sx={{display:'flex',flexWrap:'wrap', alignItems:'center'}}>
        <IconButton 
            href="https://facebook.com"
          target="_blank"
            sx={{width:'50px', height:'50px'}}>
            <FacebookIcon sx={{color:'white', width:'50px',height:'50px'}}/>
          </IconButton>
          <IconButton 
            href="https://www.instagram.com"
          target="_blank"
            sx={{width:'50px', height:'50px'}}>
            <InstagramIcon sx={{color:'white', width:'50px',height:'50px'}}/>
          </IconButton>
        <IconButton 
            href="https://twitter.com"
          target="_blank"
            sx={{width:'50px', height:'50px'}}>
            <TwitterIcon sx={{color:'white', width:'50px',height:'50px'}}/>
          </IconButton>
        <IconButton 
            href="https://www.youtube.com"
          target="_blank"
            sx={{width:'50px', height:'50px'}}>
            <YouTubeIcon sx={{color:'white', width:'50px',height:'50px'}}/>
          </IconButton>

      </Box>
      </Box>
    </Box>
    <Box sx={{width:'100%',height:{sm:'70px',md:'50px'},display:'flex',backgroundColor:'#322826',justifyContent:'center',alignItems:'center',marginBottom:{xs:'45px',sm:'45px',md:'0px'}}}>
        <Typography sx={{display:'flex',justifyContent:'center',alignItems:'center',color:'white'}}>Copyright © 2025 Victory Borewells. All Rights Reserved.</Typography>
        
        </Box>
      </Box>
  );
};

export default Footer;