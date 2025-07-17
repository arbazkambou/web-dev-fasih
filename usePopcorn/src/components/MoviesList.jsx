import Movie from "./Movie";

function MoviesList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie, index) => (
        <Movie movie={movie} key={index} />
      ))}
    </ul>
  );
}

export default MoviesList;
