import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Head from "./components/Head";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", (!darkMode).toString());
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const mode = localStorage.getItem("darkMode");
    if (mode === "true") {
      setDarkMode(true);
    }
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#228B22" : "#3f51b5",
          },
          secondary: {
            main: "#f50057",
          },
        },
        typography: {
          fontFamily: "Roboto, sans-serif",
          fontSize: 16,
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
