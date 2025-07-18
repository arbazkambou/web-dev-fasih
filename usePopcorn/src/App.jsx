import { Children, useState } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { tempMovieData, tempWatchedData } from "./data/data";
import Logo from "./components/Logo";
import SearchInput from "./components/SearchInput";
import WatchedBox from "./components/WatchedBox";
import SearchResult from "./components/SearchResult";
import MoviesList from "./components/MoviesList";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";

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
