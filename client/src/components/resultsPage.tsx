import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
//import fetchCocktails from api stuff later

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsPage;
