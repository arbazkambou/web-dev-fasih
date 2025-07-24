import { useEffect, useState } from "react";
import Box from "./components/Box";
import Logo from "./components/Logo";
import Main from "./components/Main";
import MoviesList from "./components/MoviesList";
import Navbar from "./components/Navbar";
import SearchInput from "./components/SearchInput";
import SearchResult from "./components/SearchResult";
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedSummary from "./components/WatchedSummary";
import { tempWatchedData } from "./data/data";
import MovieDetails from "./components/MovieDetail";

export const apiKey = "210ec08b";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleSelectedMovie(id) {
    setSelectedMovie((prevId) => (id === prevId ? null : id));
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
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
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <SearchInput query={query} setQuery={setQuery} />
        <SearchResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {error && <p className="error">{error}</p>}
          {isLoading && <p className="loader">Loading....</p>}
          {!isLoading && !error && (
            <MoviesList
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
        </Box>
        <Box>
          {selectedMovie ? (
            <MovieDetails
              setSelectedMovie={setSelectedMovie}
              selectedMovie={selectedMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
