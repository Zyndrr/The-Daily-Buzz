import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FormControlLabel,
  FormGroup,
  Grid2,
  Link,
  Switch,
} from "@mui/material";
//import MenuIcon from '@mui/icons-material/Menu';

type HeadProps = {
  darkMode: boolean;
  toggleDarkMode: (darkMode: boolean) => void;
};

export default function Head(props: HeadProps) {
  const { darkMode, toggleDarkMode } = props;
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
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "primary" }}>
          <Grid2 container spacing={2} sx={{ width: "100%" }}>
            <Grid2 size={8}>
              {" "}
              <Link href="/" color="inherit">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, backgroundColor: "primary" }}
                >
                  The Daily Buzz
                </Typography>
              </Link>
            </Grid2>
            <Grid2 size={2}>
              {" "}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={() => toggleDarkMode(!darkMode)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Dark Mode"
                  sx={{ marginRight: "0px" }}
                />
              </FormGroup>
            </Grid2>
            <Grid2 size={2}>
              {!userDetails.username && (
                <Button href="/login" color="inherit">
                  Login
                </Button>
              )}
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
