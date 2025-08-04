import { useEffect, useState } from "react";
import Box from "./components/Box";
import Logo from "./components/Logo";
import Main from "./components/Main";
import MovieDetails from "./components/MovieDetail";
import MoviesList from "./components/MoviesList";
import Navbar from "./components/Navbar";
import SearchInput from "./components/SearchInput";
import SearchResult from "./components/SearchResult";
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedSummary from "./components/WatchedSummary";
import { useMovies } from "./hooks/useMovies";
import { useLocaleStorage } from "./hooks/useLocaleStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const { error, isLoading, movies } = useMovies(query);
  const [watched, setWatched] = useState(useLocaleStorage("watchedMovies", []));

  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleSelectedMovie(id) {
    setSelectedMovie((prevId) => (id === prevId ? null : id));
  }

  function handleAddWatch(movie) {
    setWatched((currentMovies) => [...currentMovies, movie]);
  }

  function handleCloseMovieDetails() {
    setSelectedMovie(null);
  }

  useEffect(
    function () {
      localStorage.setItem("watchedMovies", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(() => {
    const callback = function (e) {
      console.log("press", e.key);
      if (e.key === "Escape") {
        handleCloseMovieDetails();
      }
    };
    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, []);

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
              handleAddWatch={handleAddWatch}
              handleCloseMovieDetails={handleCloseMovieDetails}
              watched={watched}
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
