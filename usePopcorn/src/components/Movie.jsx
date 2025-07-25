function Movie({ movie, handleSelectedMovie }) {
  const { imdbID, Poster, Title, Year } = movie;
  return (
    <li key={imdbID} onClick={() => handleSelectedMovie(imdbID)}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
