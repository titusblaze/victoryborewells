import React, { useState, useEffect } from 'react';
import { Box, Button, Fab, IconButton } from '@mui/material';
import TrendingFlatOutlinedIcon from '@mui/icons-material/TrendingFlatOutlined';

function ScrollupIcon() {
  const [showIcon, setShowIcon] = useState(false);  // State to track if icon should be shown
  const [isScrolled, setIsScrolled] = useState(false);  // To track the scroll direction

  // Function to handle the scroll up
  const handleScrollUp = () => {
    // Scroll to the top of the page with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',  // Smooth scroll
    });
  };
  // Detect scroll position and show icon when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1500) {  // Show the icon when the user has scrolled down 100px
        setShowIcon(true);
        setIsScrolled(true);  // Scroll is detected, update state
      } else {
        setShowIcon(false); // Hide icon when scroll is at the top
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);  // Listen to scroll event

    return () => {
      window.removeEventListener('scroll', handleScroll);  // Cleanup the event listener
    };
  }, []);

  return (
    <Box sx={{display:{xs:'none',md:'flex'}}}>
      {/* Scroll Down Icon */}
      {showIcon && (
        <Fab onClick={handleScrollUp}
          variant='outlined'
          sx={{
            border:'2px solid #dfdfea',
            backgroundColor:'transparent',      //'#0bb055',
            boxShadow:'none',
            position: 'fixed',  // Make the icon fixed
            bottom: 20,         // Place it near the bottom
            right: isScrolled ? 20 : -80, // Initially off-screen, then slide in
            transform: isScrolled ? 'translateX(0%)' : 'translateX(-100%)', // Slide in/out
            transition: 'right 1s ease',  // Slide in transition
            zIndex: 10,       // Ensure it stays on top of other content
            '&:hover': {
              backgroundColor:'transparent',  // Slightly enlarge on hover
            },
          }}
        ><IconButton sx={{width:'40px',height:'40px',backgroundColor:'#322826','&:hover':{backgroundColor:'#FF6200'}}}>
          <TrendingFlatOutlinedIcon 
          sx={{width:'25px',
                height:'25px',
                color:'white',
                rotate:'270deg'
          }}/>
          </IconButton>
        </Fab>
      )}
    </Box>
  );
}

export default ScrollupIcon;
