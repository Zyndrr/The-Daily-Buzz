import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

const SearchByIngredients: React.FC = () => {
  const [ingredient, setIngredient] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (ingredient.trim() === "") return;
    navigate(`/results?type=ingredients&query=${encodeURIComponent(ingredient)}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Search by Ingredients
      </Typography>
      <TextField
        label="Enter ingredients"
        variant="outlined"
        fullWidth
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        sx={{ marginBottom: 2 }}
        placeholder="e.g., vodka, tomato juice, tobasco"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ width: "100%", padding: "10px" }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchByIngredients;
