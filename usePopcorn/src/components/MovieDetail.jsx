import { useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import { apiKey } from "../hooks/useMovies";

function MovieDetails({
  setSelectedMovie,
  selectedMovie,
  handleAddWatch,
  handleCloseMovieDetails,
  watched,
}) {
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStars] = useState(null);
  const isWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedMovie);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedMovie
  )?.userRating;

  const {
    Poster,
    Released,
    Runtime,
    Genre,
    imdbRating,
    Plot,
    Actors,
    Director,
    Title,
  } = movieDetail;

  function handleAdd() {
    const movie = {
      poster: Poster,
      title: Title,
      imdbRating: Number(imdbRating),
      runtime: Number(Runtime.split(" ")[0]),
      userRating: stars,
    };
    handleAddWatch(movie);
    handleCloseMovieDetails();
  }

  useEffect(
    function () {
      async function getMovieDetail() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedMovie}`
        );

        const data = await res.json();

        setMovieDetail(data);
        setIsLoading(false);
      }

      getMovieDetail();
    },
    [selectedMovie]
  );

  useEffect(
    function () {
      if (!Title) return;
      console.log("title", Title);
      document.title = Title;
      return () => {
        document.title = "usePopcorn";
      };
    },

    [selectedMovie, Title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <p className="loader">Loading....</p>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSelectedMovie(null)}>
              &larr;
            </button>
            <img src={Poster} alt={`Poster of ${Title} movie`} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <RatingStar
                    maxRating={10}
                    size={20}
                    setStars={setStars}
                    stars={stars}
                  />
                  {stars > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>Starring {Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
