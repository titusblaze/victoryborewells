// Gallery.js
import React, { useState } from 'react';
import { Grid, Link } from '@mui/material';
import {
  
  Modal,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const images = [
  { url: 'https://i.im.ge/2025/06/21/JOeJ74.Borewell1.jpeg', caption: 'Image 1' },
  { url: 'https://i.im.ge/2025/06/21/JOenCC.Borewell2.jpeg', caption: 'Image 2' },
  { url: 'https://i.im.ge/2025/06/21/JOe4vq.Borewell3.jpeg', caption: 'Image 3' },
  { url: 'https://i.im.ge/2025/06/21/JOenCC.Borewell2.jpeg', caption: 'Image 4' },
  { url: 'https://i.im.ge/2025/06/21/JOe4vq.Borewell3.jpeg', caption: 'Image 5' },
  { url: 'https://i.im.ge/2025/06/21/JOeJ74.Borewell1.jpeg', caption: 'Image 6' },
];
const videoList = [
  { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up' },
  { id: 'kJQP7kiw5Fk', title: 'Despacito' },
  { id: '3JZ_D3ELwOQ', title: 'Shape of You' },
  { id: 'RgKAFK5djSk', title: 'See You Again' },
  { id: 'e-ORhEE9VVg', title: 'Blank Space' },
];

const liveVideo = [
    {liveLink:'kjCa9Fb69AA',display:'yes'}
]

const Gallery = () => {
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
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <Box sx={{width:'100%', display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',paddind:'110px 0'}}>
        <Typography sx={{fontSize:{xs:'30px',md:'50px'},fontWeight:'bold',color:'#322826',padding:'15px 0'}}>Gallery</Typography>
        <Typography sx={{fontSize:{xs:'20px',md:'30px'},padding:'15px 0',fontWeight:'bold',color:'#322826',textAlign:'left'}}>Photos</Typography>
    <>
      <Grid container spacing={2} padding={2}>
        {images.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              component="img"
              src={img.url}
              alt={img.caption}
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
              src={images[currentIndex].url}
              alt={images[currentIndex].caption}
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
            {images[currentIndex].caption} ({currentIndex + 1}/{images.length})
          </Typography>
        </Box>
      </Modal>
    </>
            {liveVideo.map((Link) => (
    
        <Typography sx={{ display : Link.display === 'yes' ? 'flex' : 'none' ,fontSize:{xs:'20px',md:'30px'},padding:'15px 0',fontWeight:'bold',color:'#322826',textAlign:'left'}}>Live Video</Typography>

                            ))}

        {liveVideo.map((Link, index) => (
        <Box sx={{display : Link.display === 'yes' ? 'flex' : 'none' , width:{xs:'360px',md:'1385px'},height:{xs:'200px',md:'768px'}}}>
            <iframe
                          src={`https://www.youtube.com/embed/${Link.liveLink}`}
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
                  {videoList.map((video, index) => (
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
                          src={`https://www.youtube.com/embed/${video.id}`}
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
                        {video.title}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
        
    
    </Box>
  );
};

export default Gallery;
