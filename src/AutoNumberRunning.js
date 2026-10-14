
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EmergencyIcon from "@mui/icons-material/Emergency";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useQuery } from "@tanstack/react-query";
import fetchVictoryData from "./component/fetchVictoryData";

const iconData = [
  <FaceRetouchingNaturalIcon fontSize="large" />,
  <ThumbUpIcon fontSize="large" />,
  <EmergencyIcon fontSize="large" />,
  <VolunteerActivismIcon fontSize="large" />,
];

const Counter = ({ icon, label, target }) => {
  const [value, setValue] = useState(0);
  const numericTarget = Math.max(0, Number(target) || 0);

  useEffect(() => {
    setValue(0);

    if (numericTarget === 0) return undefined;

    let current = 0;
    const step = Math.max(1, Math.ceil(numericTarget / 100));

    const interval = setInterval(() => {
      current = Math.min(current + step, numericTarget);
      setValue(current);

      if (current >= numericTarget) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [numericTarget]);

  return (
    <Box
      sx={{
        width: { xs: "75%", md: "17%" },
        textAlign: "center",
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
        backgroundColor: "#fff",
      }}
    >
      {icon}
      <Typography variant="h4" color="text.primary" gutterBottom>
        {value}+
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
};

const AutoNumberRunning = () => {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["victoryborewellData"],
    queryFn: fetchVictoryData,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const filteredData = Array.isArray(data)
    ? data.filter((item) => Number(item.Id) === 6)
    : [];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: "40px",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", md: "80%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
          py: "40px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "30px", md: "40px" },
            color: "#333232",
            textAlign: "center",
          }}
        >
          Our Strength
        </Typography>

        {isLoading ? (
          <Box sx={{ py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ py: 3, textAlign: "center" }}>
            Unable to load our strength details. Please try again later.
          </Typography>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              flexWrap: "wrap",
              gap: "30px",
              justifyContent: "center",
              alignItems: "center",
              py: "40px",
            }}
          >
            {filteredData.map((item, index) => (
              <Counter
                key={`${item.Id}-${item.LabelText || "counter"}-${index}`}
                icon={iconData[index % iconData.length]}
                label={item.LabelText}
                target={item.Target}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AutoNumberRunning;
