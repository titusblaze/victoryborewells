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


function App() {
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
      <ScrollupIcon/>
      <Footer/>
      
      
      
      
      
      
      
    </div>
  );
}

export default App;
