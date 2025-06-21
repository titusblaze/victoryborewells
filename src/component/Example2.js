// src/App.js
import React, { useState } from 'react';
import { Avatar, Box, Button, IconButton, Link, TextField, Typography } from '@mui/material';
import emailjs from 'emailjs-com';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';




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
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        padding:'110px 60px 0 0'
      }}> 
      
      <Box sx={{width:{xs:'95%',md:'85%'}}}>
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
        <Box sx={{width:{xs:'95',md:'85%'},display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'30px',padding:'30px 0px'}}>
        {datas.map((data,index)=>(
            <Box sx={{width:{xs:'80%',md:'20%'},
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        padding:'20px 0',
                        gap:'10px',
                        borderRadius:'20px',
                        boxShadow:'3',
                        backgroundColor:'#ffffff'}}>
                
                <Avatar src={data.image} sx={{width:{xs:'150px',md:'120px'},height:{xs:'150px',md:'120px'},justifyContent:'center',alignItems:'center'}}/>       
                {/* <img style={{width:'100px'}} src={data.image}/> */}
                <Typography style={{textAlign:'left',fontSize:'20px',fontWeight:'bold',color:'#333232'}}>{data.title}</Typography>
                <p style={{textAlign:'left',margin:'0px'}}> {data.label1content}</p>
                <p style={{textAlign:'left',margin:'0px'}}> {data.label2content}</p>
                <p style={{textAlign:'left',margin:'0px',display:'flex',flexDirection:'row'}}>
                  <Avatar sx={{width:'20px',height:'20px',backgroundColor:'transparent',color:'black'}}>
                    <PhoneIcon sx={{width:'18px'}}/>
                    </Avatar> {data.label3content}</p>
                <p style={{textAlign:'left',margin:'0px',display:'flex',flexDirection:'row'}}>
                  <Avatar sx={{width:'20px',height:'20px',backgroundColor:'transparent',color:'black'}}>
                    <MailIcon sx={{width:'18px'}}/>
                    </Avatar> {data.label3content}</p>
                <Button href={data.PhoneLink}
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

            <Box sx={{width:{xs:'95',md:'85%'},display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'30px',padding:'30px 0px'}}>

              <Box sx={{width:{xs:'95%',md:'45%'},display:'flex',flexDirection:'column',gap:'30px', padding:'30px 0'}}>

                <Typography sx={{fontSize:'30px', fontWeight:'bold'}}>Branch Contact Detail</Typography>

          <Box sx={{display:'flex',flexDirection:'column', border:'solid 1px grey',padding:'20px',borderRadius:'20px'}}> 
            <Typography sx={{fontSize:'20px', fontWeight:'bold',textAlign:'left'}}>Satankulam</Typography>
          <Typography sx={{fontSize:'15px',textAlign:'left'}}>The Manager</Typography>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <IconButton href="tel:+919788112233" color="black">
          <PhoneIcon sx={{color:'black'}}/>
        </IconButton>
        <Link href="tel:+919788112233" sx={{marginTop:'9px', color:'black'}}>
          +91 97881 12233
        </Link>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row'}}>
          <IconButton href="mailto:info@example.com">
          <MailIcon sx={{color:'black'}}/>
        </IconButton>
        <Link href="mailto:info@example.com" sx={{ marginTop:'9px', color:'black'}}>
          info@example.com
        </Link>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row'}}>
          <IconButton
          href="https://maps.app.goo.gl/8smHNCg28wwgX6yV8"
          target="_blank"
          
        >
          <LocationOnIcon sx={{color:'black'}}/>
        </IconButton>
        <Link
          href="https://maps.app.goo.gl/8smHNCg28wwgX6yV8"
          target="_blank"
          sx={{ color:'black', textAlign:'left' }}
        >
          Nazareth Main Rd, opp. State bank of india, Sathankulam, Tamil Nadu - 628 704
        </Link>

        </Box>
      </Box>
        <Box sx={{display:'flex',flexDirection:'column', border:'solid 1px grey',padding:'20px',borderRadius:'20px'}}>
          <Typography sx={{fontSize:'20px', fontWeight:'bold',textAlign:'left'}}>Tisaiyanvilai</Typography>
              <Typography sx={{fontSize:'15px',textAlign:'left'}}>The Manager</Typography>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <IconButton href="tel:+919788112233" color="black">
          <PhoneIcon sx={{color:'black'}}/>
        </IconButton>
        <Link href="tel:+919788112233" sx={{marginTop:'9px', color:'black'}}>
          +91 97881 12233
        </Link>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row'}}>
          <IconButton href="mailto:info@example.com">
          <MailIcon sx={{color:'black'}}/>
        </IconButton>
        <Link href="mailto:info@example.com" sx={{ marginTop:'9px', color:'black'}}>
          info@example.com
        </Link>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row'}}>
          <IconButton
          href="https://maps.app.goo.gl/8smHNCg28wwgX6yV8"
          target="_blank"
          
        >
          <LocationOnIcon sx={{color:'black'}}/>
        </IconButton>
        <Link
          href="https://maps.app.goo.gl/8smHNCg28wwgX6yV8"
          target="_blank"
          sx={{ color:'black', textAlign:'left' }}
        >
          Nazareth Main Rd, opp. State bank of india, Sathankulam, Tamil Nadu - 628 704
        </Link>

        </Box>
      </Box>
              </Box>
              <Box sx={{
                width:{xs:'95%',md:'50%'}, 
                maxWidth: 500,
                mx: 'auto',
                mt: 5,
                p: 3,
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
      
      <Typography sx={{fontSize:'20px'}}>Thank you for reaching out to us!</Typography>
    </Box>
  );
}

export default Example2;
const datas=[
    {   
        id:1,
        image:'https://cdn-icons-png.flaticon.com/512/8608/8608769.png',
        title:'Posting',
        label1content:'Name',
        label2content:'Branch / Office',
        label3content:'+91 97881 12233',
        label4content:'info@mail.com',
        PhoneLink:'tel:+919788112233'
    },
    {   
        id:2,
        image:'https://cdn-icons-png.flaticon.com/512/8608/8608769.png',
        title:'Posting',
        label1content:'Name',
        label2content:'Branch / Office',
        label3content:'+91 97881 12233',
        label4content:'info@mail.com',
        PhoneLink:'tel:+919788112233'
    },
    {   
        id:3,
        image:'https://cdn-icons-png.flaticon.com/512/8608/8608769.png',
        title:'Posting',
        label1content:'Name',
        label2content:'Branch / Office',
        label3content:'+91 97881 12233',
        label4content:'info@mail.com',
        PhoneLink:'tel:+919788112233'
    },
    {   
        id:4,
        image:'https://cdn-icons-png.flaticon.com/512/8608/8608769.png',
        title:'Posting',
        label1content:'Name',
        label2content:'Branch / Office',
        label3content:'+91 97881 12233',
        label4content:'info@mail.com',
        PhoneLink:'tel:+919788112233'
    },
]