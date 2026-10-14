import React from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import ImageSlider from "./ImageSlider";
import Gallery from "./Gallery";
import GoogleReview from "./GoogleReview";
import AutoNumberRunning from "../AutoNumberRunning";

const API_URL =
  "https://script.google.com/macros/s/AKfycbz7UciPAZXCSdbKjIk8G6ga9xG0-4Of-2vPxwQM8mzVd0C0X-3Aza-e8Ft3FZSTKLj1/exec";

const fetchData = async () => {
  try {
    const response = await axios.get(API_URL, {
      timeout: 20000,
    });

    console.log("API response:", response.data);

    const result = response.data;

    // Support an array or common JSON object wrappers.
    if (Array.isArray(result)) return result;
    if (Array.isArray(result?.data)) return result.data;
    if (Array.isArray(result?.records)) return result.records;

    if (result?.success === false) {
      throw new Error(result.error || "Apps Script returned an error.");
    }

    throw new Error(
      "Unexpected API response. Check the console for the returned JSON."
    );
  } catch (error) {
    console.error("Google Apps Script API error:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      response: error.response?.data,
    });

    if (error.response) {
      throw new Error(
        `API HTTP error: ${error.response.status}`
      );
    }

    if (error.code === "ECONNABORTED") {
      throw new Error("API request timed out. Please try again.");
    }

    if (error.message?.includes("Network Error")) {
      throw new Error(
        "Network/CORS error. Check the Apps Script deployment and browser Network tab."
      );
    }

    throw error;
  }
};

const Home = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["borewellData"],
    queryFn: fetchData,
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
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Typography color="error">
              {error.message}
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