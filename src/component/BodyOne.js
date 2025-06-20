import EastIcon from '@mui/icons-material/East';
import { Box, Typography, TableBody, TableCell, TableContainer, TableRow, Paper, Table, TableHead, Button, Container, CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from "axios"

// Sample function to fetch data from an API
const fetchData = async () => {
    try {
      // Example API URL for data (replace with your actual URL)
      const response = await axios.get('https://script.google.com/macros/s/AKfycbzptX4BJSWz90_9_DrN-8zchhQgd3gdVRXIAiUiHYxUX84MHmvc6kbbtksSKCvy_2Y_/exec');
      return response.data; // Array of objects like the one you provided
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Error fetching data");
    }
  };
export const BodyOne = () => {

    //API Fecthing
    const [data, setData] = useState([]); // Store fetched data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const loadData = async () => {
      try {
        const apiData = await fetchData(); // Fetch data from API
        setData(apiData); // Set fetched data into state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Failed to fetch data."); // Set error state if fetching fails
        setLoading(false);
      }
    };

    loadData(); // Fetch data when component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  // Filter data based on userId (only for userId === 1 in this case)
  const filteredData1 = data.filter((item) => item.Id === 1);

    
    // Function to handle the scroll up
  const handleScrollUp = () => {
    // Scroll to the top of the page with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',  // Smooth scroll
    });
  };
      
  return (
    <Box id="packages" sx={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'110px 0px',gap:'20px'}}>
        <Typography variant='h6' sx={{color:'#333232',fontFamily:'sans-serif', fontWeight:'700'}}>Find the Right option for Your Needs!</Typography>
        <Typography variant='h3' sx={{color:'#333232',fontFamily:'sans-serif', fontWeight:'bold'}}>Most Popular Borewell Bit</Typography>

        <Box sx={{width:'90%',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',padding:'50px 0px',gap:'20px'}}>
            
        
           {filteredData1.map((item)=>(
                        
                    
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
                    <Button onClick={handleScrollUp}
                    sx={{
                        display:'flex',justifyContent:'left',textDecoration:'none',fontWeight:'700',gap:'5px',color:'#322826',
                        '&:hover':{textDecoration:'underline',color:'#FF6200',backgroundColor:'transparent'}
                    }}>
                        <EastIcon sx={{width:'15px'}}/>Book Now
                    </Button>
                </Box>


            </Box>
            ))}
        </Box>
    </Box>
  )
}

const itemData = [
    {   id:'1',
        iconimage:'http://uat.lupindiagnostics.com/assets/google/home-collection/images/icons/vitamin-b-12.png',
        subheading:'Vitamin B12',
        r1c2:'Blood Sample (3 ml Serum in Gel Tube)',
        r2c2:'NA',
        r3c2:'Measures the amount of vitamin B12 in your blood.'
    },
    {   id:'2',
        iconimage:'http://uat.lupindiagnostics.com/assets/google/home-collection/images/icons/cbc.png',
        subheading:'Complete Blood Count',
        r1c2:'Blood Sample (3 ml whole blood in EDTA Vacutainer)',
        r2c2:'NA',
        r3c2:'Evaluate overall health and detect abnormalities'

    },
    {   id:'3',
        iconimage:'http://uat.lupindiagnostics.com/assets/google/home-collection/images/icons/thyriod-profile.png',
        subheading:'Thyroid Profile',
        r1c2:'Blood Sample (3 ml serum in Gel Tube)',
        r2c2:'8-10 hours of fasting required',
        r3c2:'To assess the functioning of the thyroid gland'
    },
    {   id:'4',
        iconimage:'http://uat.lupindiagnostics.com/assets/google/home-collection/images/icons/HbA1C.png',
        subheading:'HbA1C',
        r1c2:'Blood Sample (3 ml whole blood in EDTA vacutainer)',
        r2c2:'NA',
        r3c2:'Diagnose prediabetes and diabetes, and is also the main test to help you and your health care team manage your diabetes'
    },
    {   id:'5',
        iconimage:'http://uat.lupindiagnostics.com/assets/google/home-collection/images/icons/vitamin-d.png',
        subheading:'Vitamin D',
        r1c2:'Blood Sample (3 ml serum in Gel Tube)',
        r2c2:'NA',
        r3c2:'Enhance awareness about "Vitamin D" benefits, encourage its incorporation into daily diets, and promote overall health and well-being'
    },
    {   id:'6',
        iconimage:'http://uat.lupindiagnostics.com/assets/google/home-collection/images/icons/lipid.png',
        subheading:'Lipid Profile',
        r1c2:'Blood Sample (3 ml serum in Gel Tube)',
        r2c2:'NA',
        r3c2:'The lipid profile aims to evaluate cholesterol levels, triglycerides, and lipoproteins to assess cardiovascular health     accurately'
    },

]