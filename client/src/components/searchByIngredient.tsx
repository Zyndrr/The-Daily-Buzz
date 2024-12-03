import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchByIngredients: React.FC = () => {
  const [ingredient, setIngredient] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (ingredient.trim() === "") return;
    navigate(`/results?type=ingredient&query=${encodeURIComponent(ingredient)}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search by Ingredients</h2>
      <input
        type="text"
        placeholder="Enter your ingredients (e.g., vodka, tomato juice, tobasco. etc...)"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        style={{
          marginTop: "10px",
          padding: "10px",
          width: "300px",
        }}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "10px" }}>
        Search
      </button>
    </div>
  );
};

export default SearchByIngredients;
