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

// Shared Google Apps Script JSONP API function
import fetchVictoryData from "./fetchVictoryData";

const Gallery = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["victoryborewellData"],
    queryFn: fetchVictoryData,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  // Gallery photos: Id = 3
  const filteredData1 = data.filter(
    (item) => Number(item?.Id) === 3 && item?.link
  );

  // Live video entries: Id = 4
  const filteredData2 = data.filter(
    (item) => Number(item?.Id) === 4
  );

  // Experience videos: Id = 5
  const filteredData3 = data.filter(
    (item) => Number(item?.Id) === 5 && item?.link
  );

  // Show live videos only when LabelText is "yes"
  const liveVideos = filteredData2.filter(
    (item) =>
      String(item?.LabelText ?? "")
        .trim()
        .toLowerCase() === "yes"
  );

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = filteredData1[currentIndex] ?? null;

  const handleOpen = (index) => {
    if (!filteredData1[index]) return;

    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    if (filteredData1.length < 2) return;

    setCurrentIndex(
      (previous) => (previous + 1) % filteredData1.length
    );
  };

  const handlePrev = () => {
    if (filteredData1.length < 2) return;

    setCurrentIndex(
      (previous) =>
        (previous - 1 + filteredData1.length) %
        filteredData1.length
    );
  };

  // Accept either a YouTube video ID or a standard YouTube URL.
  const getYouTubeEmbedUrl = (value) => {
    if (!value) return "";

    const input = String(value).trim();

    if (!input) return "";

    // Already an embed URL
    if (input.includes("youtube.com/embed/")) {
      return input;
    }

    // Extract a video ID from common YouTube URLs
    try {
      const url = new URL(
        input.startsWith("http") ? input : `https://${input}`
      );

      let videoId = "";

      if (url.hostname.includes("youtu.be")) {
        videoId = url.pathname.split("/").filter(Boolean)[0] || "";
      } else if (
        url.hostname.includes("youtube.com") ||
        url.hostname.includes("youtube-nocookie.com")
      ) {
        if (url.pathname === "/watch") {
          videoId = url.searchParams.get("v") || "";
        } else {
          const parts = url.pathname.split("/").filter(Boolean);

          if (
            ["live", "shorts", "embed"].includes(parts[0])
          ) {
            videoId = parts[1] || "";
          }
        }
      }

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : `https://www.youtube.com/embed/${input}`;
    } catch {
      return `https://www.youtube.com/embed/${input}`;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: { xs: 4, md: 8 },
        overflow: "hidden",
      }}
    >
      {/* MAIN HEADING */}
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: 30, sm: 38, md: 50 },
          fontWeight: 800,
          color: "#322826",
          py: 2,
          textAlign: "center",
        }}
      >
        Gallery
      </Typography>

      {/* LOADING */}
      {isLoading && (
        <Box sx={{ py: 5, textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>
            Loading gallery...
          </Typography>
        </Box>
      )}

      {/* ERROR */}
      {isError && (
        <Box
          sx={{
            textAlign: "center",
            px: 2,
            py: 4,
            width: "100%",
            maxWidth: 600,
          }}
        >
          <Typography color="error">
            Unable to load gallery:{" "}
            {error?.message || "An unexpected error occurred."}
          </Typography>

          <Button
            variant="contained"
            onClick={() => refetch()}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Box>
      )}

      {/* CONTENT */}
      {!isLoading && !isError && (
        <>
          {/* ================= PHOTOS ================= */}
          <Container maxWidth="xl" sx={{ mb: 2 }}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 22, md: 30 },
                py: 2,
                fontWeight: 800,
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
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={`${img.Id}-${index}`}
                  >
                    <Box
                      component="img"
                      src={img.link}
                      alt={img.LabelText || "Gallery photo"}
                      loading="lazy"
                      onClick={() => handleOpen(index)}
                      sx={{
                        display: "block",
                        width: "100%",
                        height: {
                          xs: 220,
                          sm: 240,
                          md: 260,
                        },
                        objectFit: "cover",
                        cursor: "pointer",
                        borderRadius: 2,
                        boxShadow: 2,
                        transition:
                          "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: 5,
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>

          {/* ================= PHOTO MODAL ================= */}
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
                width: { xs: "94%", sm: "85%", md: "75%" },
                maxWidth: 1100,
                maxHeight: "95vh",
                overflow: "auto",
                bgcolor: "#111",
                color: "#fff",
                p: { xs: 1, sm: 2 },
                outline: "none",
                borderRadius: 2,
                background:
                  "radial-gradient(circle, rgba(30,30,30,1) 0%, rgba(0,0,0,1) 100%)",
              }}
            >
              {currentImage && (
                <>
                  <Box sx={{ position: "relative" }}>
                    {/* CLOSE */}
                    <IconButton
                      onClick={handleClose}
                      aria-label="Close gallery"
                      sx={{
                        position: "absolute",
                        zIndex: 2,
                        top: 4,
                        right: 4,
                        color: "#fff",
                        bgcolor: "rgba(0,0,0,0.65)",
                        "&:hover": {
                          bgcolor: "rgba(70,70,70,0.9)",
                        },
                      }}
                    >
                      <CloseIcon />
                    </IconButton>

                    {/* PREVIOUS / NEXT */}
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
                            bgcolor: "rgba(0,0,0,0.65)",
                            "&:hover": {
                              bgcolor: "rgba(70,70,70,0.9)",
                            },
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
                            bgcolor: "rgba(0,0,0,0.65)",
                            "&:hover": {
                              bgcolor: "rgba(70,70,70,0.9)",
                            },
                          }}
                        >
                          <ArrowForwardIosIcon />
                        </IconButton>
                      </>
                    )}

                    {/* ACTIVE PHOTO */}
                    <Box
                      component="img"
                      src={currentImage.link}
                      alt={
                        currentImage.LabelText || "Gallery photo"
                      }
                      sx={{
                        display: "block",
                        width: "100%",
                        maxHeight: "75vh",
                        objectFit: "contain",
                        borderRadius: 1,
                      }}
                    />
                  </Box>

                  <Typography
                    textAlign="center"
                    sx={{
                      mt: 2,
                      pb: 1,
                      fontSize: { xs: 14, md: 16 },
                    }}
                  >
                    {currentImage.LabelText || "Gallery photo"} (
                    {currentIndex + 1}/{filteredData1.length})
                  </Typography>
                </>
              )}
            </Box>
          </Modal>

          {/* ================= LIVE VIDEO ================= */}
          {liveVideos.map((video, index) => {
            const embedUrl = getYouTubeEmbedUrl(video.link);

            return (
              <Container
                maxWidth="xl"
                key={`live-${video.Id}-${index}`}
                sx={{ mt: 4 }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: 22, md: 30 },
                    py: 2,
                    fontWeight: 800,
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
                    bgcolor: "#000",
                  }}
                >
                  {embedUrl && (
                    <Box
                      component="iframe"
                      src={embedUrl}
                      title={video.title || "Live video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      sx={{
                        width: "100%",
                        height: "100%",
                        border: 0,
                      }}
                    />
                  )}
                </Box>
              </Container>
            );
          })}

          {/* ================= EXPERIENCE VIDEOS ================= */}
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 22, md: 30 },
                py: 2,
                fontWeight: 800,
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
                {filteredData3.map((video, index) => {
                  const embedUrl = getYouTubeEmbedUrl(video.link);

                  return (
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
                          bgcolor: "#000",
                          transition: "transform 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.02)",
                          },
                        }}
                      >
                        {embedUrl && (
                          <Box
                            component="iframe"
                            src={embedUrl}
                            title={
                              video.title ||
                              video.LabelText ||
                              "Experience video"
                            }
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                            sx={{
                              position: "absolute",
                              inset: 0,
                              width: "100%",
                              height: "100%",
                              border: 0,
                            }}
                          />
                        )}
                      </Box>

                      {video.LabelText && (
                        <Typography
                          variant="subtitle1"
                          textAlign="center"
                          sx={{ mt: 1, fontWeight: 600 }}
                        >
                          {video.LabelText}
                        </Typography>
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Container>
        </>
      )}
    </Box>
  );
};

export default Gallery;