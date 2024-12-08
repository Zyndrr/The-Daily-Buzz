import * as React from "react";
import cocktails from "../assets/COCKTAILS-2.jpg";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "" });
  useEffect(() => {
    const getUserData = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await axios.post(`/api/user/verify`, { token: jwt });
        setUserDetails(response.data);
      } catch {
        return;
      }
    };
    getUserData();
  }, []);

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
          {userDetails?.username && <Button variant="outlined" onClick={()=>navigate('/menu')}>To Your Menu</Button>}
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
