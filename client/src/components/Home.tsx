import * as React from "react";
import cocktails from "../assets/COCKTAILS-2.jpg";
import { Box, Grid2, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={3}>
        <Grid2 size={6}>
          <Typography variant="h2" component="h2">
            Welcome to The Daily Buzz
          </Typography>
          <Typography variant="h4" component="h4">
            Cocktails aren’t just drinks, they’re experiences. Find yours at The
            Daily Buzz!
          </Typography>
        </Grid2>
        <Grid2 size={6}>
          <img
            width={"100%"}
            height={"100%"}
            src={cocktails}
            alt="The Daily Buzz"
            className="right-image"
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}
