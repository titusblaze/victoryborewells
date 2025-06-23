import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';

const GoogleReview = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Load the iframe resizer script
    const script = document.createElement('script');
    script.src = 'https://testimonial.to/js/iframeResizer.min.js';
    script.async = true;

    script.onload = () => {
      if (window.iFrameResize && iframeRef.current) {
        window.iFrameResize(
          { log: false, checkOrigin: false },
          iframeRef.current
        );
      }
    };

    document.body.appendChild(script);
  }, []);

  return (
    <Box style={{ width: '100%'}}>
      <Box sx={{width:'100%', display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Typography sx={{fontSize:{xs:'30px',md:'50px'},fontWeight:'bold', padding:'30px 0'}}>Testimonial</Typography>
      </Box>
      <iframe
        ref={iframeRef}
        id="google-724f6a5d-822e-47c3-ac97-a623b6916087"
        src="https://embed-v2.testimonial.to/simple/google/724f6a5d-822e-47c3-ac97-a623b6916087?theme=dark"
        frameBorder="0"
        scrolling="yes"
        width="100%"
        title="Google Testimonials"
        style={{ minHeight: 'auto' }}
      ></iframe>
    <Box sx={{width:'300px',height:'50px',justifyContent:'center',alignItems:'center',position:'relative',left:{xs:'10%',md:'39%'},bottom:48}}>
        <Button href='https://g.co/kgs/X2wf59r'
        variant='outlined'
        
        sx={{
            width:'295px', height:'45px', color:'#c9e3f0',backgroundColor:'#0c2b3a', borderColor:'#c9e3f0'
        }}>Write Review</Button>
      </Box>
    </Box>
  );
};

export default GoogleReview;
