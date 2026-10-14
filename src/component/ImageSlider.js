import React, { useState, useEffect } from "react";

import {
  Box,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import { useQuery } from "@tanstack/react-query";

// Shared Google Apps Script JSONP API
import fetchVictoryData from "./fetchVictoryData";

const ImageSlider = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["victoryborewellData"],
    queryFn: fetchVictoryData,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  // Support both numeric IDs and IDs stored as strings.
  const filteredData = data.filter(
    (item) => Number(item?.Id) === 2 && item?.link
  );

  // WhatsApp phone number from Sheet row with Id = 12.
  const whatsappPhone = data.find(
    (item) => Number(item?.Id) === 12
  )?.Phone;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [open, setOpen] = useState(false);

  // Booking form state
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  // Keep the selected slide within the available image range.
  useEffect(() => {
    if (currentSlide >= filteredData.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, filteredData.length]);

  // Automatically change slides every five seconds.
  useEffect(() => {
    if (filteredData.length < 2) return undefined;

    const interval = setInterval(() => {
      setCurrentSlide((previous) => {
        return (previous + 1) % filteredData.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredData.length]);

  const nextSlide = () => {
    if (filteredData.length < 2) return;

    setCurrentSlide(
      (previous) => (previous + 1) % filteredData.length
    );
  };

  const prevSlide = () => {
    if (filteredData.length < 2) return;

    setCurrentSlide(
      (previous) =>
        (previous - 1 + filteredData.length) %
        filteredData.length
    );
  };

  // WhatsApp booking submission.
  const handleSubmit = () => {
    const cleanName = name.trim();
    const cleanArea = area.trim();
    const cleanMobile = mobile.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanArea || !cleanMobile) {
      window.alert("Please enter your name, area, and mobile number.");
      return;
    }

    if (!whatsappPhone) {
      window.alert(
        "The WhatsApp contact number is missing from the Google Sheet. Please check the Phone field for Id = 12."
      );
      return;
    }

    // Normalize the stored contact number.
    // If the sheet contains a +91 number, don't add the country code twice.
    let phoneNumber = String(whatsappPhone).replace(/\D/g, "");

    if (phoneNumber.startsWith("0")) {
      phoneNumber = phoneNumber.slice(1);
    }

    if (phoneNumber.length === 10) {
      phoneNumber = `91${phoneNumber}`;
    }

    if (!phoneNumber.startsWith("91") || phoneNumber.length !== 12) {
      window.alert(
        "Please check the WhatsApp phone number stored in the Google Sheet."
      );
      return;
    }

    const bookingText = [
      "Booking Request",
      `Name: ${cleanName}`,
      `Area: ${cleanArea}`,
      `Mobile: ${cleanMobile}`,
      `Message: ${cleanMessage || "No additional message"}`,
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        bookingText
      )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setOpen(false);
  };

  const currentImage = filteredData[currentSlide];

  return (
    <Box
      id="banner"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ================= IMAGE SLIDER ================= */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: 420, sm: 520, md: "100vh" },
          backgroundColor: "#171717",
          backgroundImage: currentImage?.link
            ? `linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05)), url("${currentImage.link}")`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "flex-end",
          color: "#fff",
          mt: { xs: "60px", md: "80px" },
          overflow: "hidden",
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        {/* LOADING */}
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              color: "#fff",
            }}
          >
            <CircularProgress sx={{ color: "#ff7a00" }} />
            <Typography>Loading images...</Typography>
          </Box>
        )}

        {/* ERROR */}
        {isError && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 3,
            }}
          >
            <Typography textAlign="center" color="error">
              Unable to load slider images. Please refresh the page.
            </Typography>
          </Box>
        )}

        {/* EMPTY SLIDER */}
        {!isLoading && !isError && filteredData.length === 0 && (
          <Box sx={{ width: "100%", p: 4, textAlign: "center" }}>
            <Typography color="#fff">
              No slider images available.
            </Typography>
          </Box>
        )}

        {/* SLIDE TEXT AND BOOKING BUTTON */}
        {currentImage && (
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              width: "90%",
              mx: "auto",
              pb: { xs: 10, sm: 12, md: 15 },
              pt: { xs: 6, md: 10 },
            }}
          >
            <Typography
              component="h1"
              sx={{
                maxWidth: 950,
                textAlign: "left",
                fontSize: {
                  xs: "25px",
                  sm: "42px",
                  md: "70px",
                },
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#fff",
                textShadow: "2px 3px 8px rgba(0,0,0,0.8)",
                overflowWrap: "anywhere",
              }}
            >
              {currentImage.LabelText || ""}
            </Typography>
          </Box>
        )}

        {/* BOOK NOW */}
        {filteredData.length > 0 && (
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              position: "absolute",
              bottom: { xs: 18, md: 40 },
              right: { xs: 18, md: 40 },
              zIndex: 3,
              borderRadius: "30px",
              px: { xs: 2.5, md: 4 },
              py: { xs: 1, md: 1.5 },
              fontSize: { xs: 13, md: 16 },
              fontWeight: 800,
              color: "#fff",
              backgroundColor: "#ff6a00",
              "&:hover": {
                backgroundColor: "#e65c00",
              },
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            BOOK NOW
          </Button>
        )}

        {/* PREVIOUS ARROW */}
        {filteredData.length > 1 && (
          <IconButton
            onClick={prevSlide}
            aria-label="Previous slide"
            sx={{
              position: "absolute",
              top: "50%",
              left: { xs: 8, md: 18 },
              transform: "translateY(-50%)",
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.55)",
              zIndex: 2,
              "&:hover": {
                backgroundColor: "rgba(255,106,0,0.9)",
              },
            }}
          >
            <ChevronLeft fontSize="large" />
          </IconButton>
        )}

        {/* NEXT ARROW */}
        {filteredData.length > 1 && (
          <IconButton
            onClick={nextSlide}
            aria-label="Next slide"
            sx={{
              position: "absolute",
              top: "50%",
              right: { xs: 8, md: 18 },
              transform: "translateY(-50%)",
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.55)",
              zIndex: 2,
              "&:hover": {
                backgroundColor: "rgba(255,106,0,0.9)",
              },
            }}
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        )}

        {/* SLIDE INDICATORS */}
        {filteredData.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 25, md: 50 },
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
              zIndex: 2,
            }}
          >
            {filteredData.map((item, index) => (
              <Box
                key={`${item.Id}-${index}`}
                component="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                sx={{
                  width: currentSlide === index ? 24 : 9,
                  height: 9,
                  border: 0,
                  borderRadius: 10,
                  p: 0,
                  cursor: "pointer",
                  backgroundColor:
                    currentSlide === index ? "#ff7a00" : "#fff",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* ================= BOOKING FORM ================= */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            mx: { xs: 1.5, sm: 2 },
            width: { xs: "100%", sm: "auto" },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            color: "#322826",
            borderBottom: "1px solid #eee",
          }}
        >
          Book Borewell
        </DialogTitle>

        <DialogContent sx={{ pt: "12px !important" }}>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mb: 1 }}
          >
            Enter your details to continue your booking through WhatsApp.
          </Typography>

          <TextField
            label="Name"
            fullWidth
            required
            margin="normal"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Area"
            fullWidth
            required
            margin="normal"
            autoComplete="address-level2"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />

          <TextField
            label="Mobile"
            fullWidth
            required
            margin="normal"
            type="tel"
            autoComplete="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <TextField
            label="Message"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{ color: "#555" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#ff6a00",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#e65c00",
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageSlider;