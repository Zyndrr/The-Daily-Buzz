import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchByName: React.FC = () => {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (name.trim() === "") return;
    navigate(`/results?type=name&query=${encodeURIComponent(name)}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search by Cocktail Name</h2>
      <input
        type="text"
        placeholder="Enter cocktail name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

export default SearchByName;
