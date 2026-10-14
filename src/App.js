import "./App.css";

import { Routes, Route } from "react-router-dom";

import { Navbar } from "./component/Navbar";
import Home from "./component/Home";
import { BodyOne } from "./component/BodyOne";
import Footer from "./component/Footer";
import ScrollupIcon from "./component/ScrollupIcon";
import Example2 from "./component/Example2";
import AboutUs from "./component/AboutUs";
import Payment from "./component/Payment";
import Advertisement from "./component/Advertisement";

import { useQuery } from "@tanstack/react-query";

import {
  Box,
  LinearProgress,
  Typography,
  Button,
} from "@mui/material";

// Shared Google Apps Script JSONP function
import fetchVictoryData from "./component/fetchVictoryData"

function App() {
  const {
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

  // Loading screen
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#111",
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="/logo512.png"
          alt="Victory Borewells"
          sx={{
            width: { xs: 100, sm: 120 },
            height: "auto",
            mb: 2.5,
            animation: "victoryPulse 2s infinite",
            "@keyframes victoryPulse": {
              "0%": {
                transform: "scale(1)",
                opacity: 0.7,
              },
              "50%": {
                transform: "scale(1.08)",
                opacity: 1,
              },
              "100%": {
                transform: "scale(1)",
                opacity: 0.7,
              },
            },
          }}
        />

        {/* Loading text */}
        <Typography
          sx={{
            color: "#fff",
            letterSpacing: 2,
            mb: 2,
            fontWeight: 500,
          }}
        >
          Loading...
        </Typography>

        {/* Progress bar */}
        <Box sx={{ width: "220px", maxWidth: "80%" }}>
          <LinearProgress
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: "#333",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#ff7a00",
              },
            }}
          />
        </Box>
      </Box>
    );
  }

  // API error screen
  if (isError) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          px: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#111",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#ff7a00",
            fontWeight: 700,
            mb: 1,
          }}
        >
          Unable to load website data
        </Typography>

        <Typography
          sx={{
            color: "#ddd",
            mb: 2,
            maxWidth: 500,
            overflowWrap: "anywhere",
          }}
        >
          {error?.message ||
            "Please check your internet connection and try again."}
        </Typography>

        <Button
          variant="contained"
          onClick={() => refetch()}
          sx={{
            backgroundColor: "#ff7a00",
            color: "#111",
            fontWeight: 700,
            px: 4,
            "&:hover": {
              backgroundColor: "#ff9633",
            },
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // Website
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/packages" element={<BodyOne />} />
        <Route path="/contact" element={<Example2 />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>

      <Advertisement />

      <ScrollupIcon />

      <Footer />
    </div>
  );
}

export default App;