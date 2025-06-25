import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import React, { useState }  from 'react'
import { Drawer, Box, Button, AppBar, Toolbar, Typography, IconButton, ButtonGroup} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';


export const Navbar = () => {

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
  };
   
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
          xs: '40%',  
          sm: '40%',   
          md: '14%',   
          lg: '14%',   
        },
        marginLeft:{
          xs:'16px',
          sm:'16px'
        },
        height: 'auto',  
        display: 'flex',  
        justifyContent:'left',
        alignItems:'center'
      }}>
           <img src= {logo} alt='logo' style={{width:'60px ', height:'auto'}} />
        </Box>

        <Box sx={{
         width: {
          xs: '50%',  
          sm: '50%',   
          md: '80%',   
          lg: '80%',   
        },
        height: 'auto',  
        display: 'flex',
        justifyContent:'right',
        alignItems:'center',
        gap:'10px'
      }}>
        
        
          <Button  component={Link} to="/"           sx={Style.NavButton}>Home</Button>
          <Button  component={Link} to="/about"      sx={Style.NavButton}>About</Button>
          <Button  component={Link} to="/packages"   sx={Style.NavButton}>Packages</Button>
          <Button  component={Link} to="/contact"    sx={Style.NavButton}>Contact</Button>
          <Button  component={Link} to="/payment"    sx={Style.NavButton}>Payment</Button>
        
      
    <IconButton 
    sx={{
      display:{
        xs:'flex',
        sm:'flex',
        md:'none',
        lg:'none'
      },
      width:'50%'
      
    }}
    variant="contained" color="orange" 
    onClick={() => toggleDrawer(true)}>
        <MenuIcon sx={{color:'orange'}}/>
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
            <CloseIcon />
          </Button>

          {/* Drawer Content */}
          <Button component={Link} to="/"  
          variant="h6" sx={{
                                color:'black','&:hover':{color:'#632c76',backgroundColor:'transparent'}}}>Home</Button>
          <Button component={Link} to="/about"            
          variant="h6" sx={{
                                color:'black','&:hover':{color:'#632c76',backgroundColor:'transparent'}}}>About</Button>

          <Button component={Link} to="/packages"
           variant="h6" sx={{
                                color:'black','&:hover':{color:'#632c76',backgroundColor:'transparent'}}}>Packages</Button>
          <Button component={Link} to="/contact"
           variant="h6" sx={{
                                color:'black','&:hover':{color:'#632c76',backgroundColor:'transparent'}}}>Contact</Button>
          <Button component={Link} to="/payment"
           variant="h6" sx={{
                                color:'black','&:hover':{color:'#632c76',backgroundColor:'transparent'}}}>Payment</Button>
                                
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

                <ButtonGroup sx={{width:'100%',height:'50px'}}>
                <Button href="tel:9788112233" sx={{width:'50%',backgroundColor:'#FF6200',fontSize:'13px',fontWeight:'500',textTransform:'none',color:'white'}}>Request a Call</Button>
                <Button onClick={handleScrollUp} 
                sx={{width:'50%',backgroundColor:'#322826',fontSize:'13px',fontWeight:'500',textTransform:'none',color:'white'}}>
                  Back to Home</Button>
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
                    <Box
                      sx={{width:'100%',
                        display: 'flex',
                        whiteSpace: 'nowrap',
                        animation: {xs:'scroll-left 10s linear infinite',md:'scroll-left 20s linear infinite'},
                      }}
                    >
                        <Typography
                          sx={{
                            paddingRight: '50px',
                            fontSize: {sx:'1rem',md:'1.2rem'},
                            fontWeight: 'bold',
                          }}
                        >
                          "May the favor of the Lord our God rest upon us; establish the work of our hands for us – yes, establish the work of our hands.” Psalm 90:17
                        </Typography>
                    </Box>
                  </Box>

    </Box>
 
  )
}