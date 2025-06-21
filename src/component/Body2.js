import React from 'react'
import { Box, Typography } from '@mui/material'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

export const Body2 = () => {
const imageUrl = 'https://www.shutterstock.com/image-photo/water-flowing-artesian-well-land-600nw-1472868881.jpg';
    
  return (
    <Box id="services" sx={{width:'100%',position:'relative',display:'flex',flexDirection:'column',backgroundColor:'#f3f3f3', justifyContent:'center',alignItems:'center',padding:'110px 0px'}}>
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
            

            <Box 
            sx={{
                width:'78px',
                height:'78px',
                backgroundColor:'#4f3838',
                borderRadius:'39px',
                justifyContent:'center',
                alignItems:'center',
                margin:'30px 0px 250px 30px'
                }}>
                    <MiscellaneousServicesIcon sx={{width:'70px',height:'70px',color:'white'}}/>
                    
            </Box>
            <Box sx={{width:'100%',display:{xs:'none',md:'block'}}}>
            
                <p style={{ textAlign:'left',
                            fontSize:'23px',
                            fontWeight:'bold',
                            color:'#333232',
                           // position:'absolute',
                            bottom:'16%',
                            left:'10%',
                            zIndex:1
                            }}>
                            In case of a borewell emergency, focus on safety, immediate rescue efforts 
                            and damage control. includes securing the area, assessing the situation,
                            and contacting relevant authorities like (NDRF)
                </p>
            
                
                    

            </Box>
            
        </Box>
        <Box
        sx={{
            width:{xs:'90%',md:'40%'},
            display:'flex',
            flexDirection:'column',
            padding:'10px',
            
        }}>
            <p style={{textAlign:'left',margin:'0px'}}>At Victory Borewell, we specialize in providing comprehensive borewell 
                solutions to meet diverse water needs. Our services are designed to ensure reliable, sustainable, and efficient 
                water access for domestic, agricultural, and industrial purposes.</p>

                <Box sx={{width:'100%',display:'flex',flexWrap:'wrap',paddingTop:'30px',gap:'20px',justifyContent:'center'}}>
                {dataitem.map((data) => (
                    <Box key={dataitem}
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
                            <img style={{width:'40px'}} src={data.image}/>
                            
                        </Box>
                        <p style={{height:data.height}}>{data.detail}</p>
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