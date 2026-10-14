
import React from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";

import fetchVictoryData from "./fetchVictoryData";

import ImageSlider from "./ImageSlider";
import Gallery from "./Gallery";
import GoogleReview from "./GoogleReview";
import AutoNumberRunning from "../AutoNumberRunning";

const Home = () => {
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

  const filteredData = data.filter(
    (item) => String(item.Id) === "22"
  );

  return (
    <Box>
      <ImageSlider />

      <Container maxWidth="lg" sx={{ py: 7 }}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ fontSize: { xs: 30, md: 50 }, mb: 4 }}
        >
          About Us
        </Typography>

        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 4,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Typography color="error">
              {error?.message || "Unable to load About Us data."}
            </Typography>

            <button onClick={() => refetch()}>
              Retry
            </button>
          </Box>
        )}

        {!isLoading &&
          !isError &&
          filteredData.map((item, index) => (
            <Box
              key={item.Id ?? index}
              sx={{
                width: { xs: "100%", md: "85%" },
                mx: "auto",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 3,
              }}
            >
              <Typography
                component="p"
                sx={{ textAlign: "justify", flex: 1 }}
              >
                {item.LabelText}
              </Typography>

              <Avatar
                src={item.link}
                alt="About us"
                sx={{ width: 150, height: 150 }}
              />
            </Box>
          ))}

        {!isLoading &&
          !isError &&
          filteredData.length === 0 && (
            <Typography textAlign="center">
              No About Us record found for Id 22.
            </Typography>
          )}
      </Container>

      <Gallery />
      <AutoNumberRunning />
      <GoogleReview />
    </Box>
  );
};

export default Home;
