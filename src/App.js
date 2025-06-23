import logo from './logo.svg';
import './App.css';
import { Navbar } from './component/Navbar';
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


function App() {
  return (
    <div className="App">
      <Navbar/>
      <ImageSlider/>
      <AboutUs/>
      <Gallery/>
      <BodyOne/>
      <Body2/>
      <Example2/>
      <AutoNumberRunning/>
      <GoogleReview/>
      <ScrollupIcon/> 
      <Footer/>
      
      
      
      
      
      
      
    </div>
  );
}

export default App;
