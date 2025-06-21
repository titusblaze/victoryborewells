import React from 'react'
import {Box, List, ListItem, Typography} from '@mui/material'

const AboutUs = () => {
  
  const Style={
    Container:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        backgroundColor:'#f5f5f5',
        alignItems:'center',
        justifyContent:'center',
        padding:'110px 0'
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
        textAlign:'left',
        marginLeft:'20px',

    },
    ListStyle:{
        listStyleType: 'disc',
        pl: 2,
        marginLeft:'40px'
    },
    ListItemStyle:{
        display: 'list-item'
    }

  }

    return (
    <Box id="about" sx={Style.Container}>
        <Box sx={Style.TitleBox}>
            <Typography sx={Style.TitleText}>
                About Us
                </Typography>
                <Box sx={Style.ContentBox}>
                <Typography style={Style.SubTitle}>Our Legacy</Typography>
                <p style={Style.Paragraph}>
                    Established in 2015, Victory Borewell has been a trusted provider of 
                    borewell drilling services, specializing in delivering reliable water 
                    solutions across Thoothukudi & Tirunelveli District Location Satankulam. 
                    With over 10 years of experience, we have built a reputation for excellence, 
                    safety, and customer satisfaction.
                </p>
                <Typography style={Style.SubTitle}>Our Services</Typography>
                <p style={Style.Paragraph}>
                    We offer a comprehensive range of services to meet diverse water needs: 
                    </p>
                    <List style={Style.ListStyle}>
                        <ListItem style={Style.ListItemStyle}>
                            Borewell Drilling: Utilizing advanced rigs and techniques to drill borewells 
                            of varying depths and diameters.
                        </ListItem>
                        <ListItem style={Style.ListItemStyle}>
                            Borewell Cleaning & Maintenance: Ensuring optimal performance and longevity of 
                            existing borewells.
                        </ListItem>
                        <ListItem style={Style.ListItemStyle}>
                            Pump Installation & Repair: Providing installation and maintenance services for 
                            submersible and openwell pumps.
                        </ListItem>
                        <ListItem style={Style.ListItemStyle}>
                            Water Survey & Consultation: Conducting geophysical surveys to assess groundwater 
                            availability and quality.
                        </ListItem>
                        <ListItem style={Style.ListItemStyle}>
                            Rainwater Harvesting Solutions: Designing and implementing systems to conserve and 
                            utilize rainwater effectively. 
                        </ListItem>
                    </List>
                    <Typography style={Style.SubTitle}>Our Mission</Typography>
                        <p style={Style.Paragraph}>
                             To provide sustainable and efficient water solutions that meet the needs of our clients, 
                             ensuring access to clean and reliable water sources.  
                                </p>
                    <Typography style={Style.SubTitle}>Our Vision</Typography>
                        <p style={Style.Paragraph}>
                             To be recognized as a leading borewell service provider, known for our commitment to quality, 
                             innovation, and customer satisfaction.   
                                </p>
                    <Typography style={Style.SubTitle}>Why Choose Us?</Typography>
                    
                    <List style={Style.ListStyle}>
                        <ListItem style={Style.ListItemStyle}>
                            Experienced Team: Our team comprises skilled professionals with extensive 
                            experience in the borewell industry.
                        </ListItem>
                        <ListItem style={Style.ListItemStyle}>
                            Advanced Equipment: We employ state-of-the-art drilling rigs and technology 
                            to deliver precise and efficient services.
                        </ListItem>
                        <ListItem style={Style.ListItemStyle}>
                            Customer-Centric Approach: We prioritize customer satisfaction, offering tailored 
                            solutions to meet specific requirements.
                        </ListItem>
                        <ListItem style={Style.ListItemStyle}>
                            Timely Execution: We adhere to project timelines, ensuring prompt and efficient service delivery.
                        </ListItem>
                        <ListItem style={Style.ListItemStyle}>
                            Competitive Pricing: Our services are priced competitively, offering value without compromising on quality. 
                        </ListItem>
                    </List>
                    



                    </Box>

        </Box>
    </Box>
  )
}

export default AboutUs