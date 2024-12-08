import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

const SearchByName: React.FC = () => {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (name.trim() === "") return;
    navigate(`/results?type=name&query=${encodeURIComponent(name)}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Search by Cocktail Name
      </Typography>
      <TextField
        label="Enter cocktail name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2 }}
        placeholder="e.g., Margarita, Martini, Mojito"
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

export default SearchByName;
