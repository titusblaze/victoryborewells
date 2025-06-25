// src/App.js
import React, { useState } from 'react';
import { Avatar, Box, Button, CircularProgress, Container, IconButton, TextField, Typography } from '@mui/material';
import emailjs from 'emailjs-com';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk');
  return response.data;
};



const SERVICE_ID = 'your_service_id';
const TEMPLATE_ID = 'your_template_id';
const PUBLIC_KEY = 'your_public_key';

function Example2() {

  const { data = [], isLoading, error } = useQuery({
      queryKey: ['borewellData'],
      queryFn: fetchData,
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });

  const [formData, setFormData] = useState({
    name: '',
    mobile:'',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Email send error:', error);
      });
  };

  const sendWhatsApp = () => {
    const message = `Name: ${formData.name}\nPhone Number: ${formData.mobile} \nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const phoneNumber = '+919788112233'; // Your WhatsApp number (with country code)
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
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
  
    const filteredData1 = data.filter((item) => item.Id === 9);
    const filteredData2 = data.filter((item) => item.Id === 10);

  
  return (
    <Box id="contact"
      sx={{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        padding:'110px 0'
      }}> 
      
      <Box sx={{width:{xs:'90%',md:'85%'}}}>
      <Typography variant="h5" gutterBottom sx={{fontSize:'30px',fontWeight:'bold',color:'#333232', padding:'20px 0'}}> 
        Contact Us
      </Typography>
      <Typography sx={{fontSize:'20px',textAlign:'left', padding:'20px 0'}}>
       We’d love to hear from you!
      Whether you have a question, need support, or just want to say hello, 
      our team is here to help. Please use the information below to get in touch with us.
        </Typography>
    </Box>
      
        {/* Contact Person Card */}
        <Box sx={{width:'90%',display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'30px',padding:'30px 0px'}}>
        {filteredData1.map((data,index)=>(
            <Box sx={{width:{xs:'85%',md:'20%'},
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        padding:'20px 0',
                        gap:'10px',
                        borderRadius:'20px',
                        boxShadow:'3',
                        backgroundColor:'#ffffff'}}>
                
                <Avatar src={data.link} sx={{width:{xs:'150px',md:'120px'},height:{xs:'150px',md:'120px'},justifyContent:'center',alignItems:'center'}}/>       
                {/* <img style={{width:'100px'}} src={data.image}/> */}
                <Typography style={{textAlign:'left',fontSize:'20px',fontWeight:'bold',color:'#333232'}}>{data.LabelText}</Typography>
                <p style={{textAlign:'left',margin:'0px',fontSize:'18px'}}> {data.LabelText1}</p>
                <p style={{textAlign:'left',margin:'0px',fontSize:'18px'}}> {data.LabelTect2}</p>
                <p style={{textAlign:'left',margin:'0px',display:'flex',flexDirection:'row',fontSize:'18px', gap:'10px'}}>
                  <Avatar sx={{width:'20px',height:'20px',backgroundColor:'transparent',color:'black'}}>
                    <PhoneIcon sx={{width:'18px', marginTop:'5px'}}/>
                    </Avatar> +91 {data.Phone}</p>
                <p style={{textAlign:'left',margin:'0px',display:'flex',flexDirection:'row',gap:'10px'}}>
                  <Avatar sx={{width:'20px',height:'20px',backgroundColor:'transparent',color:'black'}}>
                    <MailIcon sx={{width:'18px', marginTop:'5px'}}/>
                    </Avatar> {data.Email}</p>
                <Button href={`tel:91${data.Phone}`}
                        sx={{
                            display:'flex',marginTop:'26px',justifyContent:'left',textDecoration:'none',fontWeight:'700',gap:'5px',color:'#333232',
                            '&:hover':{textDecoration:'underline',color:'#FF6200',backgroundColor:'transparent'}
                        }}>
                            <Avatar 
                            sx={{width:'20px',height:'20px',backgroundColor:'#333232','&:hover':{backgroundColor:'#FF6200'}}}>
                              <PhoneIcon sx={{width:'13px'}}/>
                              </Avatar> Call Now
                        </Button>
                </Box>
            
        ))}
            </Box>

            <Box sx={{width:'90%',display:'flex',flexDirection:{xs:'column',md:'row'},alignItems:'center',justifyContent:'center',padding:'30px 0px'}}>

            {/* Address Detail */}
              <Box sx={{width:{xs:'95%',md:'60%'},display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center', padding:'20px 0'}}>

                <Typography sx={{fontSize:'30px', fontWeight:'bold',padding:'50px 0'}}>Branch Contact Detail</Typography>
                <Box sx={{width:{xs:'90%',md:'95%'},display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',gap:'30px'}}>
            {filteredData2.map((data,index) => ( 
          <Box sx={{width:{xs:'85%',md:'40%'},display:'flex',flexDirection:'column', border:'solid 1px grey',padding:'20px',borderRadius:'20px'}}> 
            <Box sx={{width:'100%',display:'flex',flexDirection:'column'}}>
            <Typography sx={{fontSize:'20px', fontWeight:'bold',textAlign:'left'}}>{data.LableText}</Typography>
          <Typography sx={{fontSize:'15px',textAlign:'left'}}>{data.LabelText1}</Typography>
          
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <IconButton href="tel:+919788112233" color="black">
          <PhoneIcon sx={{color:'black'}}/>
        </IconButton>
        <Link href={`tel:91${data.Phone}`} style={{marginTop:'9px', color:'black'}}>
          +91 {data.Phone}
        </Link>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row'}}>
          <IconButton href="mailto:info@example.com">
          <MailIcon sx={{color:'black'}}/>
        </IconButton>
        <Link href="mailto:info@example.com" style={{ marginTop:'9px', color:'black'}}>
          info@example.com
        </Link>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
          <IconButton
          href={`${data.Email}`}
          target="_blank"
          
        >
          <LocationOnIcon sx={{color:'black'}}/>
        </IconButton>
        <Link
          href={`${data.Location}`}
          target="_blank"
          style={{ color:'black', textAlign:'left' }}
        >
          {data.LabelText2}
        </Link>

        </Box>
        </Box>
      </Box>
        ))}
        </Box>
      <Typography sx={{fontSize:'20px',fontStyle:'italic'}}>Thank you for reaching out to us!</Typography>

              </Box>
              {/* Contact FOrm */}
              <Box sx={{ width:{xs:'85%',md:'35%'}, 
                maxWidth: 500,
                mx: 'auto',
                mt: 5,
                p: 3,
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: 'white'}}>
                  <Typography sx={{fontSize:'30px',fontWeight:'bold', padding:'20px 0'}}>Contact Form</Typography>
                    <form onSubmit={sendEmail}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Phone Number"
                        name="mobile"
                        type="xxxxx xxxxx"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Message me your required bore size"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="primary" type="submit" onClick={sendEmail} sx={{display:'none'}}>
                          Submit to Email
                        </Button>
                        <Button variant="outlined"  onClick={sendWhatsApp}
                        sx={{
                          backgroundColor:'green',
                          color:'white',
                          '&:hover':{backgroundColor:'#e3eade',}
                        }}>
                          Send via WhatsApp
                        </Button>
                      </Box>
                    </form>
                </Box>
            </Box>
      
    </Box>
  );
}

export default Example2;
