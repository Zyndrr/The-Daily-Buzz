import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
    const response = await fetch(`/api/cocktails/searchBy${type.charAt(0).toUpperCase() + type.slice(1)}/${query}`);
    const data = await response.json();
    return data;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Results</h1>
      {cocktails.length === 0 ? (
        <p>No cocktails found. Try a different search!</p>
      ) : (
        <ul>
          {cocktails.map((cocktail, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              <h2>{cocktail.name}</h2>
              <p>
                <strong>Ingredients:</strong> {cocktail.ingredients}
              </p>
              {/* <p>
                <strong>Instructions:</strong> {cocktail.instructions}
              </p> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsPage;
