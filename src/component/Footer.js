
import React from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchVictoryData from "./fetchVictoryData";

const Footer = () => {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["victoryborewellData"],
    queryFn: fetchVictoryData,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const footerData = Array.isArray(data) ? data : [];
  const contactData = footerData.filter(
    (item) => Number(item.Id) === 12
  );
  const socialData = footerData.filter(
    (item) => Number(item.Id) === 13
  );

  const footerLinkSx = {
    color: "white",
    textAlign: "left",
    textDecoration: "none",
    "&:hover": {
      color: "#FF6200",
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#5e4c48",
        pt: "20px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", md: "85%" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
          py: "20px",
          gap: "20px",
        }}
      >
        {isLoading ? (
          <Typography sx={{ color: "white" }}>
            Loading footer...
          </Typography>
        ) : error ? (
          <Typography sx={{ color: "white" }}>
            Contact details are temporarily unavailable.
          </Typography>
        ) : (
          <>
            {/* Company information */}
            <Box
              sx={{
                width: { xs: "100%", md: "20%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {contactData.map((item, index) => (
                <Box
                  key={`company-${item.Phone || index}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={item.link}
                    alt={item.LabelText || "Victory Borewells"}
                    sx={{
                      width: { xs: "150px", md: "120px" },
                      height: { xs: "150px", md: "120px" },
                    }}
                  />

                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "20px",
                      mt: 1,
                    }}
                  >
                    {item.LabelText}
                  </Typography>

                  <Typography
                    sx={{ color: "white", fontSize: "13px" }}
                  >
                    {item.LabelText1}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* About Us */}
            <Box
              sx={{
                width: { xs: "100%", md: "30%" },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                About Us
              </Typography>

              {contactData.map((item, index) => (
                <Typography
                  key={`about-${item.Phone || index}`}
                  sx={{
                    textAlign: "left",
                    color: "white",
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.Paragraph}
                </Typography>
              ))}
            </Box>

            {/* Navigation links */}
            <Box
              sx={{
                width: { xs: "100%", md: "15%" },
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  textAlign: "left",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Links
              </Typography>

              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Packages", path: "/packages" },
                { label: "Contact", path: "/contact" },
                { label: "Payment", path: "/payment" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleScrollUp}
                  style={{
                    color: "white",
                    textAlign: "left",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Box>

            {/* Head Office */}
            <Box
              sx={{
                width: { xs: "100%", md: "30%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "20px",
                  mb: 1,
                }}
              >
                Head Office
              </Typography>

              {contactData.map((item, index) => (
                <Box
                  key={`office-${item.Phone || index}`}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Button
                    component="a"
                    href={`tel:+91${item.Phone}`}
                    startIcon={<PhoneIcon />}
                    sx={{
                      textTransform: "none",
                      textAlign: "left",
                      justifyContent: "flex-start",
                      color: "white",
                      maxWidth: "100%",
                      overflowWrap: "anywhere",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#FF6200",
                      },
                    }}
                  >
                    +91 {item.Phone}
                  </Button>

                  <Button
                    component="a"
                    href={`mailto:${item.Email}`}
                    startIcon={<EmailIcon />}
                    sx={{
                      textTransform: "none",
                      textAlign: "left",
                      justifyContent: "flex-start",
                      color: "white",
                      maxWidth: "100%",
                      overflowWrap: "anywhere",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#FF6200",
                      },
                    }}
                  >
                    {item.Email}
                  </Button>

                  <Button
                    component="a"
                    href={item.Location}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LocationOnIcon />}
                    sx={{
                      textTransform: "none",
                      textAlign: "left",
                      justifyContent: "flex-start",
                      color: "white",
                      maxWidth: "100%",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#FF6200",
                      },
                    }}
                  >
                    {item.LabelText2}
                  </Button>
                </Box>
              ))}
            </Box>

            {/* Logo and social media */}
            <Box
              sx={{
                width: { xs: "100%", md: "30%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Victory Borewells logo"
                sx={{ width: "80px", height: "auto" }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                {socialData.map((item, index) => (
                  <IconButton
                    key={`footer-social-${item.mlink || item.link || index}`}
                    component="a"
                    href={item.mlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open social media link ${index + 1}`}
                    sx={{ p: 1 }}
                  >
                    <Box
                      component="img"
                      src={item.link}
                      alt="Social media"
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>

      {/* Copyright */}
      <Box
        sx={{
          width: "100%",
          minHeight: { xs: "70px", md: "50px" },
          display: "flex",
          backgroundColor: "#322826",
          justifyContent: "center",
          alignItems: "center",
          mb: { xs: "45px", sm: "45px", md: 0 },
          px: 2,
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            py: "5px",
            fontSize: { xs: "13px", md: "14px" },
            textAlign: "center",
          }}
        >
          Copyright © 2025 Victory Borewells. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
