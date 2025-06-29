import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './component/Navbar';
import Home from './component/Home';
import { Body2 } from './component/Body2';
import { BodyOne } from './component/BodyOne';
import Footer from './component/Footer';
import ScrollupIcon from './component/ScrollupIcon';
import Example2 from './component/Example2';
import AboutUs from './component/AboutUs';
import AutoNumberRunning from './AutoNumberRunning';
import ImageSlider from './component/ImageSlider';
import Gallery from './component/Gallery';
import GoogleReview from './component/GoogleReview';
import Payment from './component/Payment';
import Advertisement from './component/Advertisement';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';

const fetchData = async () => {
  const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk');
  return response.data;
};



function App() {
  const { data = [], isLoading, error } = useQuery({
      queryKey: ['victoryborewellData'],
      queryFn: fetchData,
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });
   if (isLoading) {
        return (
          <Box
      sx={{
        height: '100vh',             // Full viewport height
        display: 'flex',
        justifyContent: 'center',    // Center horizontally
        alignItems: 'center',        // Center vertically
      }}
    >
      <CircularProgress />
    </Box>
        );
      }
    
      if (error) {
        return (
          <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography color="error">Failed to fetch data.</Typography>
    </Box>
        );
      }
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/packages" element={<BodyOne/>} />
        <Route path="/contact" element={<Example2/>} />
        <Route path="/payment" element={<Payment/>} />
      </Routes> 
      <Advertisement/>
      <ScrollupIcon/>
      <Footer/>
      
      
      
      
      
      
      
    </div>
  );
}

export default App;
