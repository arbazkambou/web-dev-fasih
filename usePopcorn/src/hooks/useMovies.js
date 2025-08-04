import { useEffect, useState } from "react";

export const apiKey = "210ec08b";

export function useMovies(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(
    function () {
      const abortController = new AbortController();
      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
            {
              signal: abortController.signal,
            }
          );

          if (!res.ok) {
            throw new Error("Something went wrong");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movies not found");
          }

          // console.log("data", data);
          setMovies(data.Search);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }

      if (query.length > 3) {
        fetchMovies();
      } else {
        setError("Try searching something");
      }

      return () => {
        abortController.abort();
      };
    },
    [query]
  );

  return { isLoading, error, movies };
}
