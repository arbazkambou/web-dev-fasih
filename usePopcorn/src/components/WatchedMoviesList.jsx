import WatchedMovie from "./WatchedMovie";

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedMovie movie={movie} key={index} />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
