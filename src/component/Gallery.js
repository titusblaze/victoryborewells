import React, { useState } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  Modal,
  Box,
  IconButton,
  Typography,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL =
  "https://script.google.com/macros/s/AKfycbz7UciPAZXCSdbKjIk8G6ga9xG0-4Of-2vPxwQM8mzVd0C0X-3Aza-e8Ft3FZSTKLj1/exec";

const fetchData = async () => {
  const response = await axios.get(API_URL, {
    timeout: 20000,
  });

  const result = response.data;

  if (!Array.isArray(result)) {
    throw new Error(
      result?.error || "The API did not return a valid data array."
    );
  }

  return result;
};

const Gallery = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["victoryborewellData"],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  // Normalize Google Sheets IDs: 3 and "3" both match.
  const filteredData1 = data.filter(
    (item) => Number(item?.Id) === 3 && item?.link
  );

  const filteredData2 = data.filter(
    (item) => Number(item?.Id) === 4
  );

  const filteredData3 = data.filter(
    (item) => Number(item?.Id) === 5 && item?.link
  );

  const liveVideos = filteredData2.filter(
    (item) => String(item?.LabelText ?? "").trim().toLowerCase() === "yes"
  );

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Always derive the active image safely.
  const currentImage = filteredData1[currentIndex] ?? null;

  const handleOpen = (index) => {
    if (!filteredData1[index]) return;

    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleNext = () => {
    if (filteredData1.length < 2) return;

    setCurrentIndex((prev) => (prev + 1) % filteredData1.length);
  };

  const handlePrev = () => {
    if (filteredData1.length < 2) return;

    setCurrentIndex(
      (prev) => (prev - 1 + filteredData1.length) % filteredData1.length
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: { xs: 5, md: 8 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 30, md: 50 },
          fontWeight: "bold",
          color: "#322826",
          py: 2,
        }}
      >
        Gallery
      </Typography>

      {isLoading && (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading gallery...</Typography>
        </Box>
      )}

      {isError && (
        <Box sx={{ textAlign: "center", px: 2, py: 3 }}>
          <Typography color="error">
            Unable to load gallery: {error?.message}
          </Typography>
          <Button onClick={() => refetch()} sx={{ mt: 1 }}>
            Retry
          </Button>
        </Box>
      )}

      {!isLoading && !isError && (
        <>
          {/* PHOTOS */}
          <Container maxWidth="xl">
            <Typography
              sx={{
                fontSize: { xs: 20, md: 30 },
                py: 2,
                fontWeight: "bold",
                color: "#322826",
              }}
            >
              Photos
            </Typography>

            {filteredData1.length === 0 ? (
              <Typography sx={{ py: 2 }}>
                No gallery photos available.
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {filteredData1.map((img, index) => (
                  <Grid item xs={12} sm={6} md={4} key={`${img.Id}-${index}`}>
                    <Box
                      component="img"
                      src={img.link}
                      alt={img.LabelText || "Gallery photo"}
                      onClick={() => handleOpen(index)}
                      sx={{
                        display: "block",
                        width: "100%",
                        height: { xs: 220, md: 260 },
                        objectFit: "cover",
                        cursor: "pointer",
                        borderRadius: 2,
                        boxShadow: 2,
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.02)" },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>

          {/* PHOTO MODAL */}
          <Modal
            open={open && Boolean(currentImage)}
            onClose={handleClose}
            aria-label="Gallery photo viewer"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "94%", md: "75%" },
                maxWidth: 1100,
                maxHeight: "95vh",
                overflow: "auto",
                bgcolor: "#111",
                color: "#fff",
                p: { xs: 1, md: 2 },
                outline: "none",
                borderRadius: 2,
                background:
                  "radial-gradient(circle, rgba(30,30,30,1) 0%, rgba(0,0,0,1) 100%)",
              }}
            >
              {currentImage && (
                <>
                  <Box sx={{ position: "relative" }}>
                    <IconButton
                      onClick={handleClose}
                      aria-label="Close gallery"
                      sx={{
                        position: "absolute",
                        zIndex: 2,
                        top: 4,
                        right: 4,
                        color: "#fff",
                        bgcolor: "rgba(0,0,0,0.5)",
                      }}
                    >
                      <CloseIcon />
                    </IconButton>

                    {filteredData1.length > 1 && (
                      <>
                        <IconButton
                          onClick={handlePrev}
                          aria-label="Previous photo"
                          sx={{
                            position: "absolute",
                            zIndex: 2,
                            top: "50%",
                            left: 4,
                            transform: "translateY(-50%)",
                            color: "#fff",
                            bgcolor: "rgba(0,0,0,0.5)",
                          }}
                        >
                          <ArrowBackIosIcon />
                        </IconButton>

                        <IconButton
                          onClick={handleNext}
                          aria-label="Next photo"
                          sx={{
                            position: "absolute",
                            zIndex: 2,
                            top: "50%",
                            right: 4,
                            transform: "translateY(-50%)",
                            color: "#fff",
                            bgcolor: "rgba(0,0,0,0.5)",
                          }}
                        >
                          <ArrowForwardIosIcon />
                        </IconButton>
                      </>
                    )}

                    <Box
                      component="img"
                      src={currentImage.link}
                      alt={currentImage.LabelText || "Gallery photo"}
                      sx={{
                        display: "block",
                        width: "100%",
                        maxHeight: "75vh",
                        objectFit: "contain",
                        borderRadius: 1,
                      }}
                    />
                  </Box>

                  <Typography textAlign="center" sx={{ mt: 2 }}>
                    {currentImage.LabelText || "Gallery photo"} (
                    {currentIndex + 1}/{filteredData1.length})
                  </Typography>
                </>
              )}
            </Box>
          </Modal>

          {/* LIVE VIDEO */}
          {liveVideos.map((video, index) => (
            <Container
              maxWidth="xl"
              key={`live-${video.Id}-${index}`}
              sx={{ mt: 4 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 20, md: 30 },
                  py: 2,
                  fontWeight: "bold",
                  color: "#322826",
                }}
              >
                Live Video
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  maxHeight: 768,
                  overflow: "hidden",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Box
                  component="iframe"
                  src={`https://www.youtube.com/embed/${video.link}`}
                  title={video.title || "Live video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sx={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                />
              </Box>
            </Container>
          ))}

          {/* EXPERIENCE VIDEOS */}
          <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Typography
              sx={{
                fontSize: { xs: 20, md: 30 },
                py: 2,
                fontWeight: "bold",
                color: "#322826",
              }}
            >
              Experience Video
            </Typography>

            {filteredData3.length === 0 ? (
              <Typography sx={{ py: 2 }}>
                No experience videos available.
              </Typography>
            ) : (
              <Grid container spacing={3}>
                {filteredData3.map((video, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={`${video.Id}-${index}`}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        aspectRatio: "16 / 9",
                        overflow: "hidden",
                        borderRadius: 2,
                        boxShadow: 3,
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.02)" },
                      }}
                    >
                      <Box
                        component="iframe"
                        src={`https://www.youtube.com/embed/${video.link}`}
                        title={video.title || video.LabelText || "Experience video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        sx={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          border: 0,
                        }}
                      />
                    </Box>

                    <Typography variant="subtitle1" textAlign="center" sx={{ mt: 1 }}>
                      {video.LabelText}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </>
      )}
    </Box>
  );
};

export default Gallery;