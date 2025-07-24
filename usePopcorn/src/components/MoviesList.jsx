import Movie from "./Movie";

function MoviesList({ movies, handleSelectedMovie }) {
  return (
    <ul className="list">
      {movies?.map((movie, index) => (
        <Movie
          movie={movie}
          key={index}
          handleSelectedMovie={handleSelectedMovie}
        />
      ))}
    </ul>
  );
}

export default MoviesList;
