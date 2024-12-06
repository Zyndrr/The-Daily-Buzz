import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

interface Cocktail {
  name: string;
  ingredients: string;
  instructions: string;
}

const ResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const type = searchParams.get("type") as "name" | "ingredient";

    if (!query || !type) return;

    setLoading(true);
    fetchCocktails(query, type)
      .then((data) => {
        setCocktails(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [searchParams]);

  // Fetch cocktails based on the query type (name or ingredient)
  const fetchCocktails = async (query: string, type: "name" | "ingredient") => {
    const response = await fetch(
      `/api/cocktails/searchBy${type.charAt(0).toUpperCase() + type.slice(1)}/${query}`
    );
    const data = await response.json();
    return data;
  };

  // Handle saving drinks to the menu (API request)
  const handleSaveToMenu = async (cocktail: Cocktail) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("You must be logged in to save cocktails.");
      return;
    }

    const response = await fetch("/api/user/drinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        drink: {
          name: cocktail.name,
          ingredients: cocktail.ingredients,
        },
      }),
    });

    if (response.ok) {
      alert("Drink saved to your menu!");
    } else {
      alert("Failed to save the drink.");
    }
  };

  const handleGoToMenu = () => {
    // Navigate to MenuPage
    navigate("/menu");
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "red",
        }}
      >
        <p>Error: {error}</p>
      </Box>
    );

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
      }}
    >
      <h1>Search Results</h1>
      {cocktails.length === 0 ? (
        <p>No cocktails found. Try a different search!</p>
      ) : (
        <List>
          {cocktails.map((cocktail, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={cocktail.name}
                  secondary={
                    <>
                      <strong>Ingredients:</strong> {cocktail.ingredients}
                      <br />
                      <strong>Instructions:</strong> {cocktail.instructions}
                    </>
                  }
                />
              </ListItem>
              {localStorage.getItem("jwt") && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSaveToMenu(cocktail)}
                  sx={{ marginTop: "10px" }}
                >
                  Save to Menu
                </Button>
              )}
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGoToMenu}
        sx={{ marginTop: "20px" }}
      >
        Go to Menu
      </Button>
    </Box>
  );
};

export default ResultsPage;
