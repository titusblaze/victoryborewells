import EastIcon from '@mui/icons-material/East';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, TableBody, TableCell, TableContainer, TableRow, Paper, Table, TableHead, Button, Container, CircularProgress, Dialog, DialogTitle, IconButton, DialogContent, TextField, DialogActions } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk');
  return response.data;
};

export const BodyOne = () => {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['borewellData'],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    email: '',
    message: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendWhatsApp = () => {
    const message = `Name: ${formData.name}\nPhone Number: ${formData.mobile} \nLocation: ${formData.location}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const phoneNumber = '+919788112233';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    handleClose();
  };

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

  const filteredData1 = data.filter((item) => item.Id === 7);
  const filteredData2 = data.filter((item) => item.Id === 8);
      
  return (
    <Box id="packages" sx={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'20px'}}>
           
           {filteredData1.map((item)=>(
      <Box
      sx={{
        height: { xs: 'auto', md: '100vh' },
        width: '100%',
        backgroundImage: `url(${item.link})`, // Replace with your image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection:'column-reverse',
       // justifyContent: 'center',
       // alignItems: 'center',
        marginTop: { xs: '60px', md: '80px' },
        position: 'relative',
        color: '#ffffff',
        
      }}>
        {/* Optional: Overlay dark background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      <Box 
          sx={{ 
                height:{xs:'200px'},
                display: 'flex',
                position:'relative',
                flexDirection:'column',
                justifyContent:{md:'center'},
                alignItems:{ms:'center'},
                top: {xs:90,md:0},
                paddingBottom:{xs:'0px',md:'100px'} 
                }}>
        <Typography
          className="fade-in fade-in-1"
          sx={{ fontWeight: 'bold',fontSize:{xs:'25px',md:'60px'},}}
        >
          {item.LabelText}
        </Typography>
        <Typography
          className="fade-in fade-in-2"
          sx={{ fontSize:{xs:'15px',md:'40px'}  }}
        >
          {item.LabelText1}
        </Typography>
        <Typography
          className="fade-in fade-in-3"
          sx={{ fontSize:{xs:'15px',md:'40px'} }}
        >
          {item.LabelText2}
        </Typography>
      </Box>
    </Box>
          ))}
          {filteredData1.map((item)=>(
        <Typography variant='h6' sx={{color:'#333232',fontFamily:'sans-serif', fontWeight:'700'}}>{item.Title}</Typography> ))}
        {filteredData1.map((item)=>(
        <Typography variant='h3' sx={{color:'#333232',fontFamily:'sans-serif', fontWeight:'bold', fontSize:{xs:'30px'}}}>{item.Title1}</Typography> ))}
          
        <Box sx={{width:'90%',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',padding:'50px 0px',gap:'20px'}}>
            
        
           {filteredData2.map((item)=>(
                        
                    
            <Box key={item.id}
            sx={{
                width:{ XS:'90%',
                        SM:'90%',
                        md:'28%',
                        lg:'28%'
                },
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                padding:'20px',
                boxShadow:'3',
                borderBottom:'solid 5px #6c757d',
                transition: 'transform 0.3s ease', // Smooth transition for transform

                '&:hover':{borderBottomColor:'#FF6200',
                    transform: 'translateY(-10px)', // Moves the box 10px upward on hover
                }

                }}>

                <Box sx={{width:'90%',display:'flex',flexDirection:'row'}}>
                    <Box sx={{width:'22%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <img src={item.iconimage}/>
                        </Box>
                    <Box sx={{width:'80%',display:'flex',justifyContent:'left',alignItems:'center',padding:'0px 30px'}}>
                        <Typography color='#322826' sx={{
                            fontSize:{XS:'30px',sm:'30px',md:'20px',lg:'20px'},
                            fontWeight:'700',
                        }}>{item.Title}</Typography>
                    </Box>
                </Box>
                <Box sx={{width:'100%',display:'flex',flexDirection:'column'}}>
                <TableContainer component={Paper} sx={{ margin: '16px 0' }}>
                    <Table>
                        
                        <TableBody>
                        <TableRow sx={{backgroundColor:'#f2f2f2'}}>
                            <TableCell sx={{ fontSize:'15px',fontWeight:'700' }}>Bore Drill Price</TableCell>
                            <TableCell sx={{ fontSize:'15px',borderLeft: '2px solid #dfdfdf' }}>{item.Description1}</TableCell>
                        </TableRow>
                        <TableRow sx={{backgroundColor:'#ededed'}}>
                            <TableCell sx={{ fontWeight:'700',
                                                borderTop: '2px solid #dfdfdf', 
                                                borderBottom: '2px solid #dfdfdf',
                                                fontSize:'15px',
                                            }}>
                                                    Bore With 60 Feet Outer</TableCell>
                            <TableCell sx={{    borderTop: '2px solid #dfdfdf', 
                                                borderBottom: '2px solid #dfdfdf',
                                                borderLeft: '2px solid #dfdfdf',
                                                fontSize:'15px',
                                            }}>
                                                    {item.Description2}</TableCell>
                        </TableRow>
                        <TableRow sx={{backgroundColor:'#f2f2f2'}}>
                            <TableCell sx={{ fontSize:'15px',fontWeight:'700' }}>Bore with Full Outer</TableCell>
                            <TableCell sx={{ fontSize:'15px',borderLeft: '2px solid #dfdfdf' }}>{item.Description3}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button onClick={handleOpen}
                    sx={{
                        display:'flex',justifyContent:'left',textDecoration:'none',fontWeight:'700',gap:'5px',color:'#322826',
                        '&:hover':{color:'#FF6200',backgroundColor:'transparent'}
                    }}>
                        <EastIcon sx={{width:'15px'}}/>Get Quote
                    </Button>
                    <Button href='tel:+919788112233'
                    sx={{
                        display:'flex',justifyContent:'left',textDecoration:'none',fontWeight:'700',gap:'5px',color:'#322826',
                        '&:hover':{color:'#FF6200',backgroundColor:'transparent'}
                    }}>
                        Call Now
                    </Button>
                </Box>
                </Box>


            </Box>
            ))}
        </Box>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Contact Us
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <TextField
              margin="dense"
              label="Name"
              type="text"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Mobile"
              type="number"
              name="mobile"
              fullWidth
              required
              value={formData.mobile}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Location"
              type="location"
              name="location"
              fullWidth
              //required
              value={formData.location}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              name="email"
              fullWidth
              //required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Message your Requirements"
              name="message"
              multiline
              rows={4}
              fullWidth
              required
              value={formData.message}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" onClick={sendWhatsApp}>Send</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}
export default BodyOne;
