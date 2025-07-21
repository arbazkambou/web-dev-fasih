import { useState } from "react";
import Box from "./components/Box";
import Logo from "./components/Logo";
import Main from "./components/Main";
import MoviesList from "./components/MoviesList";
import Navbar from "./components/Navbar";
import SearchInput from "./components/SearchInput";
import SearchResult from "./components/SearchResult";
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedSummary from "./components/WatchedSummary";
import { tempMovieData, tempWatchedData } from "./data/data";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <>
      <Navbar>
        <Logo />
        <SearchInput />
        <SearchResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          <MoviesList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
