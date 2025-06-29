import React from 'react'
import { Body2 } from './Body2'
import {Box, CircularProgress, Container, List, ListItem, Typography} from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhxd7XRVy-MzKG-x9ojNaxrFggy_y4EUmBweTwo2wziH2cQwKYYfC46AZ4vHBJhmycN1xTERzXBS6ImTtQCX06HTxjitYquDuesLq3VvGcaGb-OgS64_Bj0BcfRaoC4Xm8imja1eA9JYq9wrf6tx_9sGVkPZg3Mg7bXwgHleWcgvkDowYqe65Rm8jK2Kpmb-n4zxiXdzlswrar2iXq6XYDZT9TqRT3Ljf9rKccA3x8F6I5OvGjkCfOz95syYBTrnK2_wnbIxT-v3S5foiOxfCkkXEO04g&lib=MEe6XMuUhqeW3L9OXUTf2CPFnlO6455Uk');
  return response.data;
};

const AboutUs = () => {

    const { data = [], isLoading, error } = useQuery({
              queryKey: ['borewellData'],
              queryFn: fetchData,
              staleTime: 1000 * 60 * 5, // cache for 5 minutes
            });
        const filteredData = data.filter((item) => item.Id === 16);
        const filteredItem = data.find((item) => item.Id === 15);
        const subHeading1 = filteredItem?.SubHeading1;
        const paragraph = filteredItem?.Paragraph;
        const SubHeading2 = filteredItem?.SubHeading2;
        const paragraph2 = filteredItem?.Paragraph2;
        const SubHeading3 = filteredItem?.SubHeading3;
        const paragraph3 = filteredItem?.Paragraph3;
        const SubHeading4 = filteredItem?.SubHeading4;
        const paragraph4 = filteredItem?.Paragraph4;
  
  const Style={
    Container:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        backgroundColor:'#f5f5f5',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:'110px'
    },
    TitleBox:{
        width:'85%',
    },
    ContentBox:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
    },
    
    TitleText:{
        fontColor:'#333232',
        fontSize:{xs:'30px',md:'50px'},
        fontWEight:'bold'
    },
    SubTitle:{
        display:'flex',
        justifyContent:'left',
        fontSize:'20px',
        fontWeight:'bold'

    },
    Paragraph:{
        display:'flex',
        textAlign:'justify',
        marginLeft:'20px',

    },
    ListStyle:{
        listStyleType: 'disc',
        pl: 2,
        marginLeft:'40px'
    },
    ListItemStyle:{
        display: 'list-item',
        textAlign:'justify',

    }

  }
  

    return (
    <Box id="about" sx={Style.Container}>
        <Box sx={Style.TitleBox}>
            <Typography sx={Style.TitleText}>
                About Us
                </Typography>
                <Box sx={Style.ContentBox}>
                <Typography style={Style.SubTitle}>{subHeading1}</Typography>
                <p style={Style.Paragraph}>
                    {paragraph}
                </p>
                <Typography style={Style.SubTitle}>{SubHeading2}</Typography>
                <p style={Style.Paragraph}>
                    {paragraph2} 
                    </p>
                    <List style={Style.ListStyle}>
                        {filteredData.map((item) => (
                        <ListItem style={Style.ListItemStyle}>
                            {item.Paragraph2}
                        </ListItem>
                        ))}
                        
                    </List>
                    <Typography style={Style.SubTitle}>{SubHeading3}</Typography>
                        <p style={Style.Paragraph}>
                             {paragraph3}  
                                </p>
                    <Typography style={Style.SubTitle}>{SubHeading4}</Typography>
                        <p style={Style.Paragraph}>
                             {paragraph4}   
                                </p>
                    <Typography style={Style.SubTitle}>Why Choose Us?</Typography>
                    
                    <List style={Style.ListStyle}>
                        {filteredData.map((item) => (
                        <ListItem style={Style.ListItemStyle}>
                            {item.Paragraph5}
                        </ListItem>
                        ))}
                        
                    </List>
                    



                    </Box>

        </Box>
        <Body2/>
    </Box>
  )
}

export default AboutUs