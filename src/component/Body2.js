import React from 'react'
import { Avatar, Box, CircularProgress, Container, Typography } from '@mui/material'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk');
  return response.data;
};

export const Body2 = () => {
    const { data = [], isLoading, error } = useQuery({
          queryKey: ['borewellData'],
          queryFn: fetchData,
          staleTime: 1000 * 60 * 5, // cache for 5 minutes
        });
    const filteredData = data.filter((item) => item.Id === 17);
    const filteredItem = data.find((item) => item.Id === 17);
    const imageUrl = filteredItem?.link;
    const filteredData1 = data.filter((item) => item.Id === 18);
         
    
  return (
    
    <Box id="services" sx={{width:'100%',position:'relative',display:'flex',flexDirection:'column',backgroundColor:'#f3f3f3', justifyContent:'center',alignItems:'center',padding:'60px 0px'}}>
        <Typography sx={{fontSize:'30px', fontWeight:'bold',color:'#333232', marginBottom:'30px'}}>Our Services</Typography>
        <Box sx={{width:{xs:'95%',md:'85%'},display:'flex',flexDirection:{xs:'column',md:'row'},justifyContent:'center',gap:'20px'}}>
        <Box 
        sx={{
            width:{xs:'100%',md:'60%'},
            height:{xs:'200px',md:'350px'},
            display:'flex',
            flexDirection:'column',
            backgroundImage:`url(${imageUrl})`,
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover'
        }}>
            

            <Avatar 
            sx={{
                width:'78px',
                height:'78px',
                backgroundColor:'#4f3838',
                borderRadius:'39px',
                justifyContent:'center',
                alignItems:'center',
                margin:'30px 0px 250px 30px',
                opacity:'0.8'
                }}>
                    <MiscellaneousServicesIcon sx={{width:'50px',height:'50px',color:'white'}}/>
                    
            </Avatar>
        {filteredData.map((item) => (

            <Box key={filteredData}
            sx={{width:'100%',display:{xs:'none',md:'block'}, flexDirection:{xs:'column'}}}>
            
                <p style={{ textAlign:'left',
                            fontSize:'23px',
                            fontWeight:'bold',
                            color:'#333232',
                           // position:'absolute',
                            bottom:'16%',
                            left:'10%',
                            zIndex:1
                            }}>
                            {item.Paragraph}
                            </p>
            </Box>
             ))}
             
        </Box>
                       
        <Box
        sx={{
            width:{xs:'90%',md:'40%'},
            display:'flex',
            flexDirection:'column',
            padding:'10px',
            
        }}>
            {filteredData.map((item) => (
            <p style={{textAlign:'justify',margin:'0px'}}>{item.Paragraph2}</p>
                ))}

                <Box sx={{width:'100%',display:'flex',flexWrap:'wrap',paddingTop:'30px',gap:'20px',justifyContent:'center'}}>
                {filteredData1.map((data) => (
                    <Box key={filteredData1}
                    sx={{width:{xs:'90%',md:'45%'},display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <Box sx={{
                            width:'60px',
                            height:'60px',
                            borderRadius:'30px',
                            border:'1px solid black',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                            <img style={{width:'40px'}} src={data.link}/>
                            
                        </Box>
                        <p style={{height:'80px'}}>{data.LabelText}</p>
                    </Box>
                ))}

                </Box>

        </Box>
        </Box>
            
    </Box>
  )
}


const dataitem = [
    {
        image:'https://www.srivenkateshwaraborewell.in/favicon.png',
        detail:'Our team conducts thorough site assessments drilling methods to ensure optimal water yield and quality.',
    },
    {
        image:'https://www.fasthelp.in/wp-content/uploads/2022/04/section-2-borewell-contractor.svg',
        detail:'We provide services to remove sediment, debris, and biofouling and extending the lifespan of your borewell.',
        height:'80px',
    },
    {
        image:'https://png.pngtree.com/png-clipart/20220110/original/pngtree-cartoon-plumber-vector-material-png-image_7066470.png',
        detail:'Our technicians also offer repair and maintenance services to ensure consistent pump performance.',
    },
    {
        image:'https://5.imimg.com/data5/FV/TV/MT/SELLER-1191445/rain-water-harvesting-plants-500x500.png',
        detail:'Our solutions are tailored to suit your properties specifications and water usage needs.',
    },
]