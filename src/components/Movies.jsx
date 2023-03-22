function MoviesResult ({ movies }) {
  return (
    <ul className='movies'>
      {
      movies.map(movie => (
        <li key={movie.id} className='movie-item'>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))
      }
    </ul>
  )
}

function NoMoviesResult () {
  return (
    <p>We haven't found any movie for this search...</p>
  )
}

export function Movies ({ movies }) {
  const responseMovies = movies?.length > 0

  return (
    responseMovies
      ? <MoviesResult movies={movies} />
      : <NoMoviesResult />
  )
}
