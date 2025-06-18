import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const RunningNumber = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * target);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <Box sx={{display:'flex',flexDirection:{sm:'column',md:'row'}, textAlign: 'center', mt: 4 }}>
        <Box sx={{display:'flex',alignItems:'center'}}>
      <Typography variant="h3" fontWeight="bold" color="primary">
        {count}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Year Of Experience {target = 1000}
      </Typography>
      </Box>
      <Box sx={{display:'flex',alignItems:'center'}}>
      <Typography variant="h3" fontWeight="bold" color="primary">
        {count}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Year Of Experience {target = 1000}
      </Typography>
      </Box>
    </Box>
  );
};

export default RunningNumber;
