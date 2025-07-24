import { useEffect, useState } from "react";
import { apiKey } from "../App";

function MovieDetails({ setSelectedMovie, selectedMovie }) {
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
            {/* <div className="rating">
          {!isWatched ? (
            <>
              <RatingS
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
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
        </div> */}
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
