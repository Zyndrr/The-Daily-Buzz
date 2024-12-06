import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";

// Define the cocktail interface
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
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ResultsPage;
