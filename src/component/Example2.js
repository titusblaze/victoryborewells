// src/App.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import emailjs from 'emailjs-com';


const SERVICE_ID = 'your_service_id';
const TEMPLATE_ID = 'your_template_id';
const PUBLIC_KEY = 'your_public_key';

function Example2() {
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


  
  return (
    <Box id="contact"
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'white'
      }}
    >
      <Typography variant="h5" gutterBottom sx={{fontWeight:'bold'}}> 
        Contact Us
      </Typography>
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
  );
}

export default Example2;
