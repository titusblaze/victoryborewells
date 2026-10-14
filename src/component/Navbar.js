
import React, { useState } from "react";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  ButtonGroup,
  Drawer,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchVictoryData from "./fetchVictoryData";

export const Navbar = () => {
  const { data = [] } = useQuery({
    queryKey: ["victoryborewellData"],
    queryFn: fetchVictoryData,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => {
    setOpen(isOpen);
  };

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setOpen(false);
  };

  const navButtonSx = {
    height: "80px",
    display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
    position: "relative",
    fontSize: "16px",
    textTransform: "none",
    border: "2px solid transparent",
    color: "white",
    fontWeight: 700,
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "2px",
      backgroundColor: "#FF6200",
      transform: "scaleX(0)",
      transformOrigin: "bottom left",
      transition: "transform 0.4s ease",
    },
    "&:hover": { color: "#FF6200" },
    "&:hover::before": { transform: "scaleX(1)" },
  };

  const drawerButtonSx = {
    width: "95%",
    color: "#FF6200",
    justifyContent: "flex-start",
    textTransform: "none",
    "&:hover": {
      color: "#d5a98e",
      backgroundColor: "transparent",
    },
  };

  const filteredData = data.filter((item) => Number(item.Id) === 1);
  const phoneData = data.filter((item) => Number(item.Id) === 12);
  const socialData = data.filter((item) => Number(item.Id) === 13);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: 999,
        top: 0,
        left: 0,
        height: "202px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          boxShadow: 3,
          zIndex: 9999,
          backgroundColor: "#322826",
        }}
      >
        <Box
          sx={{
            width: { xs: "60%", sm: "60%", md: "25%", lg: "25%" },
            ml: { xs: "10px", sm: "16px" },
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            onClick={handleScrollUp}
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Victory Borewells logo"
              sx={{
                width: { xs: "40px", md: "50px" },
                height: "auto",
                p: { xs: "10px" },
              }}
            />
            <Typography sx={{ color: { xs: "#FF6200", md: "white" } }}>
              Victory Borewells
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            width: { xs: "30%", sm: "30%", md: "75%", lg: "75%" },
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button onClick={handleScrollUp} component={Link} to="/" sx={navButtonSx}>
            Home
          </Button>
          <Button onClick={handleScrollUp} component={Link} to="/about" sx={navButtonSx}>
            About
          </Button>
          <Button onClick={handleScrollUp} component={Link} to="/packages" sx={navButtonSx}>
            Packages
          </Button>
          <Button onClick={handleScrollUp} component={Link} to="/contact" sx={navButtonSx}>
            Contact
          </Button>
          <Button onClick={handleScrollUp} component={Link} to="/payment" sx={navButtonSx}>
            Payment
          </Button>

          {phoneData.map((item, index) => (
            <Button
              key={`desktop-phone-${item.Phone || index}`}
              component="a"
              href={`tel:+91${item.Phone}`}
              aria-label="Call Victory Borewells"
              sx={{
                backgroundColor: "green",
                color: "white",
                display: { xs: "none", md: "flex" },
                "&:hover": { backgroundColor: "#FF6200" },
              }}
            >
              <LocalPhoneIcon />
            </Button>
          ))}

          <IconButton
            sx={{
              display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
              width: "20%",
            }}
            onClick={() => toggleDrawer(true)}
            aria-label="Open navigation menu"
          >
            <MenuIcon sx={{ color: "#FF6200" }} />
          </IconButton>

          <Drawer
            anchor="left"
            open={open}
            onClose={() => toggleDrawer(false)}
          >
            <Box
              sx={{
                width: 250,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                p: 2,
                backgroundColor: "#23160e",
                gap: "20px",
              }}
            >
              <Button
                onClick={() => toggleDrawer(false)}
                aria-label="Close navigation menu"
                sx={{
                  alignSelf: "flex-end",
                  minWidth: "auto",
                  p: 0,
                  mb: 2,
                }}
              >
                <CloseIcon sx={{ color: "#FF6200" }} />
              </Button>

              <Button component={Link} to="/" onClick={handleScrollUp} sx={drawerButtonSx}>
                Home
              </Button>
              <Button component={Link} to="/about" onClick={handleScrollUp} sx={drawerButtonSx}>
                About
              </Button>
              <Button component={Link} to="/packages" onClick={handleScrollUp} sx={drawerButtonSx}>
                Packages
              </Button>
              <Button component={Link} to="/contact" onClick={handleScrollUp} sx={drawerButtonSx}>
                Contact
              </Button>
              <Button component={Link} to="/payment" onClick={handleScrollUp} sx={drawerButtonSx}>
                Payment
              </Button>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px",
                  borderTop: "2px solid #FF6200",
                  pt: "30px",
                  width: "100%",
                }}
              >
                {socialData.map((item, index) => (
                  <IconButton
                    key={`drawer-social-${item.mlink || item.link || index}`}
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
          </Drawer>
        </Box>
      </Box>

      {/* Mobile bottom navigation */}
      <Box
        sx={{
          width: "100%",
          display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          zIndex: 9999,
          bottom: -1,
          right: 0,
          backgroundColor: "#482e7a",
        }}
      >
        <ButtonGroup
          disableElevation
          sx={{
            width: "100%",
            height: "50px",
            backgroundColor: "#322826",
            "& .MuiButtonGroup-grouped": { border: "none !important" },
          }}
        >
          {phoneData.map((item, index) => (
            <Button
              key={`mobile-phone-${item.Phone || index}`}
              component="a"
              href={`tel:+91${item.Phone}`}
              aria-label="Call Victory Borewells"
              sx={{
                width: "50%",
                fontSize: "13px",
                fontWeight: 500,
                textTransform: "none",
                color: "white",
              }}
            >
              <LocalPhoneIcon />
            </Button>
          ))}

          <Button
            component={Link}
            to="/"
            onClick={handleScrollUp}
            aria-label="Home"
            sx={{ width: "50%", color: "white" }}
          >
            <HomeIcon />
          </Button>
          <Button
            component={Link}
            to="/payment"
            onClick={handleScrollUp}
            aria-label="Payment"
            sx={{ width: "50%", color: "white" }}
          >
            <CurrencyRupeeIcon />
          </Button>
          <Button
            onClick={handleScrollUp}
            aria-label="Scroll to top"
            sx={{ width: "50%", color: "white" }}
          >
            <KeyboardDoubleArrowUpIcon />
          </Button>
        </ButtonGroup>
      </Box>

      {/* News scroller */}
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          color: "black",
          py: { xs: "0px", md: "8px" },
        }}
      >
        {filteredData.map((item, index) => (
          <Box
            key={`news-${item.link || index}`}
            sx={{
              display: "inline-block",
              whiteSpace: "nowrap",
              animation: "scroll-left 20s linear infinite",
              "@keyframes scroll-left": {
                "0%": { transform: "translateX(100%)" },
                "100%": { transform: "translateX(-100%)" },
              },
            }}
          >
            <Typography
              sx={{
                pr: "50px",
                fontSize: { xs: "1rem", md: "1.2rem" },
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              {item.link}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Navbar;
