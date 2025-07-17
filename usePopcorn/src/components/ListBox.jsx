import { useState } from "react";
import { tempMovieData } from "../data/data";
import Movie from "./Movie";
import MoviesList from "./MoviesList";

function ListBox() {
  const [movies, setMovies] = useState(tempMovieData);
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <MoviesList movies={movies} />}
    </div>
  );
}

export default ListBox;
