import React, { useState } from 'react';
import { Box, Typography, Button,TextField,Grid,Snackbar, Container, CircularProgress, } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk');
  return response.data;
};


const Payment = () => {
  const { data = [], isLoading, error } = useQuery({
      queryKey: ['borewellData'],
      queryFn: fetchData,
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });
   

  const filteredData = data.filter((item) => item.Id === 14);
  const filteredItem = data.find((item) => item.Id === 14);
  const upiId = filteredItem?.LabelText1;
  ////////////
  // const upiId = '9788112233-3@ybl';

  const upiUrl = encodeURI(
    `upi://pay?pa=${upiId}&pn=Victory+Borewells&tn=Service+Payment&cu=INR`
  );

  const handleQrClick = () => {
    window.location.href = upiUrl;
  };

  // Array of UPI IDs
    const upiLinks = [
      { id: 1, label: 'VICTORY RIG SERVICE', upi: 'victoryrigservice-2@okhdfcbank' },
      { id: 2, label: 'VICTORY RIG SERVICE', upi: '9788112233-3@ybl' },
      { id: 3, label: 'VICTORY RIG SERVICE', upi: '9788112233-3@ibl' },
      { id: 3, label: 'VICTORY RIG SERVICE', upi: '9788112233-3@axl' },
    ];
  
    const [copied, setCopied] = useState(false);
  
    const handleCopy = (upi) => {
      navigator.clipboard.writeText(upi).then(() => {
        setCopied(true);
      });
    };
     

  return (
    <Box sx={{width:'100%',display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',padding:'60px 0'}}>
        <Box sx={{  width:'100%',
                    height:'100px',
                    justifyContent:'center',
                    alignItems:'center',
                    background:'linear-gradient(90deg,rgba(28, 178, 232, 1) 0%, rgba(132, 214, 252, 0.43) 52%, rgba(90, 199, 232, 1) 100%)'
                    }}>
                        <Typography sx={{fontSize:'40px',fontWeight:'bold',color:'black',fontStyle:'italic',padding:'20px 0'}}>PAYMENT <span style={{fontSize:'20px',color:'#C70808'}}>GATE WAY</span> </Typography>
        </Box>
        <Box sx={{width:{xs:'95%',md:'80%'},display:'flex',flexDirection:{xs:'column', md:'row',justifyContent:'center', alignItems:'center', gap:'30px'}}}>
    <Box textAlign="center" mt={5} sx={{width:{xs:'90%',md:'50%'}}}>
      <Typography variant="h5" gutterBottom>
        Pay with UPI
      </Typography>

      {/* QR Code generated from the UPI deep link */}
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?data=${upiUrl}&size=200x200`}
        alt="UPI QR"
        onClick={handleQrClick}
        style={{ cursor: 'pointer', width: 250, height: 250 }}
      />

      <Typography variant="body2" mt={2}>
        Tap the QR on your mobile to launch UPI App <br/> (Google Pay, PhonePe, etc.)
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleQrClick}
      >
        Pay Now via UPI
      </Button>
    </Box>
    {/* //Copy UPI Id */}
                    <Box mt={4} mx="auto" maxWidth={600} sx={{width:{xs:'90%',md:'50%'}}}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Copy UPI IDs
      </Typography>

      <Grid container spacing={2}>
        {filteredData.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                fullWidth
                variant="outlined"
                label={item.LabelText}
                value={item.link}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCopy(item.link)}
                startIcon={<ContentCopyIcon />}
              >
                Copy
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="UPI ID copied!"
      />
    </Box>
    </Box>
    </Box>
  );
};

export default Payment;
