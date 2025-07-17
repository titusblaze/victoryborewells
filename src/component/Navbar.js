import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import React, { useState }  from 'react'
import { Drawer, Box, Button, AppBar, Toolbar, Typography, IconButton, ButtonGroup, Container, CircularProgress} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk');
  return response.data;
};


export const Navbar = () => {
  const { data = [], isLoading, error } = useQuery({
        queryKey: ['borewellData'],
        queryFn: fetchData,
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
      });

  const Style={
    NavButton:{
        height:'80px',
        display:{
          xs:'none',
          sm:'none',
          md:'flex',
          lg:'flex'
        },
        position: 'relative', // Required for positioning the border
        //padding: '10px 20px', // Padding for the button
        fontSize: '16px', // Font size for the button text
        textTransform: 'none', // Prevent uppercase text
        border: '2px solid transparent', // Invisible border for the effect
        color: 'white', // Initial text color
        fontWeight: '700', // Font weight
        overflow: 'hidden', // To ensure the border animation stays within the button

        // Pseudo-element for the top border animation
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px', // Height of the top border
          backgroundColor: '#FF6200', // Color of the top border orange
          transform: 'scaleX(0)', // Initially, the top border is hidden (scaleX(0))
          transformOrigin: 'bottom left', // Animation from right to left
          transition: 'transform 0.4s ease', // Smooth animation for the top border
        },

        // Hover effect for top border and text color
        '&:hover': {
          color: '#FF6200', // Change text color to red on hover
        },
        
        '&:hover::before': {
          transform: 'scaleX(1)', // On hover, expand the top border to full width
          transformOrigin: 'bottom left', // Animation from left to right
        },
           
    },
  }

  
  
  const [isClicked, setIsClicked] = useState(false);

    
   // State to manage the open/close state of the drawer
     const [open, setOpen] = useState(false);
   
     // Toggle drawer open/close
     const toggleDrawer = (isOpen) => {
       setOpen(isOpen);
     };

   // Function to handle the scroll up
  const handleScrollUp = () => {
    // Scroll to the top of the page with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',  // Smooth scroll
    });
    // Close the drawer
    setOpen(false);
  };
  
  
    
      const filteredData = data.filter((item) => item.Id === 1);
      const filteredData1 = data.filter((item) => item.Id === 12);
      const filteredData2 = data.filter((item) => item.Id === 13);
   
  return (
    <Box sx={{  width:'100%',
      display:'flex',
      flexDirection:'column',
      position:'fixed',
      zIndex:'999',
      //background:{md:'rgba(253, 250, 250, 0.5)'},
      
      }}>
    <Box sx={{  width:'100%',
                
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                boxShadow:3,
                //alignItems:'center',
                zIndex:'9999',
                //background:{md:'rgba(253, 250, 250, 0.5)'},
                backgroundColor:'#322826'
                
                
                
                
                
                }}>
          <Box sx={{
         width: {
          xs: '60%',  
          sm: '60%',   
          md: '25%',   
          lg: '25%',   
        },
        marginLeft:{
          xs:'10px',
          sm:'16px'
        },
        height: 'auto',  
        display: 'flex',  
        justifyContent:'left',
        alignItems:'center'
      }}>
        <Link to="/" style={{ textDecoration: 'none' , display:'flex',justifyContent:'center',alignItems:'center', gap:'10px'}}>
           <Box
                component="img"
                src={logo}
                alt="logo"
                sx={{
                  width: { xs: '40px', md: '50px' },   // Smaller on mobile, larger on desktop
                  height: 'auto',
                  p: { xs: '10px' },         // Responsive padding
                }}
              />
              <Typography sx={{color:{xs:'#FF6200', md:'white'}}}>Victory Borewells</Typography>
              </Link>
        </Box>
        

        <Box sx={{
         width: {
          xs: '30%',  
          sm: '30%',   
          md: '75%',   
          lg: '75%',   
        },
        height: 'auto',  
        display: 'flex',
        justifyContent:'right',
        alignItems:'center',
        gap:'10px'
      }}>
        
        
          <Button onClick={handleScrollUp} component={Link} to="/"           sx={Style.NavButton}>Home</Button>
          <Button onClick={handleScrollUp} component={Link} to="/about"      sx={Style.NavButton}>About</Button>
          <Button onClick={handleScrollUp} component={Link} to="/packages"   sx={Style.NavButton}>Packages</Button>
          <Button onClick={handleScrollUp} component={Link} to="/contact"    sx={Style.NavButton}>Contact</Button>
          <Button onClick={handleScrollUp} component={Link} to="/payment"    sx={Style.NavButton}>Payment</Button>
          {filteredData1.map((item) => (
          <Button  href={`tel:+91${item.Phone}`} sx={{backgroundColor:'green', color:'white',display:{xs:'none',md:'flex'},'&:hover':{backgroundColor:'#FF6200'}}}> <LocalPhoneIcon/> </Button>
            ))}
    <IconButton 
    sx={{
      display:{
        xs:'flex',
        sm:'flex',
        md:'none',
        lg:'none'
      },
      width:'20%'
      
    }}
    variant="contained"  
    onClick={() => toggleDrawer(true)}>
        <MenuIcon sx={{color:'#FF6200'}}/>
      </IconButton>

      {/* Drawer Component */}
      <Drawer
        anchor="left" // You can change the anchor to "right", "top", or "bottom" depending on where you want the drawer
        open={open} // Drawer open state
        onClose={() => toggleDrawer(false)} // Close drawer when clicking outside
      >
        <Box
          sx={{
            width: 250,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 2,
            backgroundColor:'#23160e',
            gap:'20px'
          }}
        >
          {/* Close Button */}
          <Button
            onClick={() => toggleDrawer(false)}
            sx={{
              alignSelf: 'flex-end',
              minWidth: 'auto',
              padding: 0,
              marginBottom: 2,
            }}
          >
            <CloseIcon sx={{color:'#FF6200'}}/>
          </Button>

          {/* Drawer Content */}
          <Button component={Link} to="/"  
          variant="h6" 
          onClick={handleScrollUp}
          sx={{width:'95%',color:'#FF6200',justifyContent: 'flex-start','&:hover':{color:'#d5a98e',backgroundColor:'transparent'}}}>Home</Button>
          <Button component={Link} to="/about"            
          variant="h6" 
          onClick={handleScrollUp} 
          sx={{width:'95%',color:'#FF6200',justifyContent: 'flex-start','&:hover':{color:'#d5a98e',backgroundColor:'transparent'}}}>About</Button>

          <Button component={Link} to="/packages"
           variant="h6" 
           onClick={handleScrollUp} 
           sx={{width:'95%',color:'#FF6200',justifyContent: 'flex-start','&:hover':{color:'#d5a98e',backgroundColor:'transparent'}}}>Packages</Button>
          <Button component={Link} to="/contact"
           variant="h6" onClick={handleScrollUp} 
           sx={{width:'95%',color:'#FF6200',justifyContent: 'flex-start','&:hover':{color:'#d5a98e',backgroundColor:'transparent'}}}>Contact</Button>
          <Button component={Link} to="/payment"
           variant="h6" 
           onClick={handleScrollUp}
           sx={{width:'95%',color:'#FF6200',justifyContent: 'flex-start','&:hover':{color:'#d5a98e',backgroundColor:'transparent'}}}>Payment</Button>

          
          <Box sx={{display:'flex',flexWrap:'wrap', alignItems:'center',gap:'10px', borderTop:'2px solid #FF6200',paddingTop:'30px'}}>
        
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
                  alt="Facebook"
                  style={{ width: 32, height: 32 }}
                />
              </IconButton>
                   ))}

      </Box>
                                
        </Box>
      </Drawer>

        </Box>

    </Box>
    <Box sx={{width:'100%',
              display:{xs:'flex',sm:'flex',md:'none',lg:'none'},
              justifyContent:'center',
              alignItems:'center',
              position:'fixed',
              zIndex:'9999',
              bottom:-1,
              right:0,
              backgroundColor:'#482e7a',
              }}>

                <ButtonGroup  
                disableElevation 
                sx={{width:'100%',height:'50px',backgroundColor:'#322826',
                  '& .MuiButtonGroup-grouped': {
                    border: 'none !important',     // Remove button borders
                    },
                }}>
                  {filteredData1.map((item) => (
                <Button href={`tel:+91${item.Phone}`} sx={{width:'50%',fontSize:'13px',fontWeight:'500',textTransform:'none',color:'white'}}>
                  <LocalPhoneIcon/>
                </Button>
                ))}
                <Button component={Link} to="/"
                onClick={handleScrollUp} 
                sx={{width:'50%',fontSize:'13px',fontWeight:'500',textTransform:'none',color:'white'}}>
                  <HomeIcon/></Button>
                  <Button component={Link} to="payment"
                onClick={handleScrollUp} 
                sx={{width:'50%',fontSize:'13px',fontWeight:'500',textTransform:'none',color:'white'}}>
                  <CurrencyRupeeIcon/></Button>
                <Button 
                onClick={handleScrollUp} 
                sx={{width:'50%',fontSize:'13px',fontWeight:'500',textTransform:'none',color:'white'}}>
                  <KeyboardDoubleArrowUpIcon/></Button>
                </ButtonGroup>

    </Box>
{/* // News Scroller */}
              <Box
                    sx={{
                      width: '100%',
                      overflow: 'hidden',
                      position: 'relative',
                      //backgroundColor: 'primary.main',
                      color: 'black',
                      padding: {xs:'0px',md:'8px 0'},
                    }}
                  >
                    {filteredData.map((item) => (
                    <Box
                        sx={{
                          display: 'inline-block',
                          whiteSpace: 'nowrap',
                          gap:'20px',
                          animation: {
                            xs: 'scroll-left 20s linear infinite',
                            md: 'scroll-left 20s linear infinite',
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            paddingRight: '50px',
                            fontSize: { xs: '1rem', md: '1.2rem' }, // Fixed typo
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            
                          }}>
                          {item.link}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

    </Box>
 
  )
}