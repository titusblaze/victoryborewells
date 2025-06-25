// Gallery.js
import React, { useState } from 'react';
import { CircularProgress, Container, Grid, Link } from '@mui/material';
import {
  
  Modal,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get(
    'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk'
  );
  return response.data;
};

const Gallery = () => {

  const { data = [], isLoading, error } = useQuery({
    queryKey: ['victoryborewellData'],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
  });

  const filteredData1 = data.filter((item) => item.Id === 3);
  const filteredData2 = data.filter((item) => item.Id === 4);
  const filteredData3 = data.filter((item) => item.Id === 5);

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredData1.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredData1.length - 1 : prev - 1));
  };

  // Loading state
  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  // Error state
  if (error || filteredData1.length === 0) {
    return (
      <Container>
        <Typography color="error">Failed to fetch or no data available.</Typography>
      </Container>
    );
  }
  // Error state
  if (error || filteredData2.length === 0) {
    return (
      <Container>
        <Typography color="error">Failed to fetch or no data available.</Typography>
      </Container>
    );
  }
  // Error state
  if (error || filteredData3.length === 0) {
    return (
      <Container>
        <Typography color="error">Failed to fetch or no data available.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{width:'100%', display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',paddind:'110px 0'}}>
        <Typography sx={{fontSize:{xs:'30px',md:'50px'},fontWeight:'bold',color:'#322826',padding:'15px 0'}}>Gallery</Typography>
        <Typography sx={{fontSize:{xs:'20px',md:'30px'},padding:'15px 0',fontWeight:'bold',color:'#322826',textAlign:'left'}}>Photos</Typography>
    <>
      <Grid container spacing={2} padding={2}>
        {filteredData1.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              component="img"
              src={img.link}
              alt={img.LabelText}
              onClick={() => handleOpen(index)}
              sx={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: 2,
                boxShadow: 2,
                transition: '0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {xs:'90%',md:'65%'},
           // maxWidth: 900,
           // maxHeight: '90vh',
            bgcolor: '#000',
            p: 2,
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            background: 'radial-gradient(circle,rgba(0, 0, 0, 0.99) 0%, rgba(0, 0, 0, 0.43) 50%, rgba(0, 0, 0, 0.42) 100%)'
          }}
        >
          <Box sx={{ position: 'relative', width: '100%' }}>
            <IconButton
              onClick={handleClose}
              sx={{ position: 'absolute', top: 8, right: 8, color: '#fff' }}
            >
              <CloseIcon />
            </IconButton>

            <IconButton
              onClick={handlePrev}
              sx={{ position: 'absolute', top: '50%', left: -0, color: '#fff' }}
            >
              <ArrowBackIosIcon />
            </IconButton>

            <Box
              component="img"
              src={filteredData1[currentIndex].link}
              alt={filteredData1[currentIndex].LabelText}
              sx={{
                width: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: 2,
              }}
            />

            <IconButton
              onClick={handleNext}
              sx={{ position: 'absolute', top: '50%', right: -0, color: '#fff' }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          <Typography variant="h6" mt={2}>
            {filteredData1[currentIndex].LabelText} ({currentIndex + 1}/{filteredData1.length})
          </Typography>
        </Box>
      </Modal>
    </>
            {filteredData2.map((Link) => (
    
        <Typography sx={{ display : Link.LabelText === 'yes' ? 'flex' : 'none' ,fontSize:{xs:'20px',md:'30px'},padding:'15px 0',fontWeight:'bold',color:'#322826',textAlign:'left'}}>Live Video</Typography>

                            ))}

        {filteredData2.map((Link) => (
        <Box sx={{display : Link.LabelText === 'yes' ? 'flex' : 'none' , width:{xs:'360px',md:'1385px'},height:{xs:'200px',md:'768px'}}}>
            <iframe
                          src={`https://www.youtube.com/embed/${Link.link}`}
                          title={Link.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{
                            position: 'relative',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                          }}
                        />
                            </Box>
                            ))}

                        
                <Typography sx={{fontSize:{xs:'20px',md:'30px'},padding:'15px 0',fontWeight:'bold',color:'#322826',textAlign:'left'}}>Experience Video</Typography>

        
            <Grid container spacing={3} padding={3}>
                  {filteredData3.map((video, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box
                        sx={{
                          position: 'relative',
                          paddingTop: '56.25%', // 16:9 Aspect Ratio
                          borderRadius: 2,
                          overflow: 'hidden',
                          boxShadow: 3,
                          mb: 1,
                          cursor: 'pointer',
                            transition: '0.3s',
                            '&:hover': {
                            transform: 'scale(1.03)',
                            },
                        }}
                      >
                        <iframe
                          src={`https://www.youtube.com/embed/${video.link}`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height:'100%',
                            
                          }}
                        />
                      </Box>
                      <Typography variant="subtitle1" textAlign="center">
                        {video.LabelText}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
        
    
    </Box>
  );
};

export default Gallery;
