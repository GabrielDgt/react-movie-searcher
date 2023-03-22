import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sortByYear, sortByTitle }) {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const lastSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (search === lastSearch.current) return

    try {
      lastSearch.current = search
      const moviesAux = await searchMovies({ search })
      setMovies(moviesAux)
    } catch (e) {
      setError(e.message)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    console.log('sorted')
    return (
      sortByYear
        ? [...movies].sort((a, b) => a.year - b.year)
        : sortByTitle
          ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
          : movies
    )
  }, [sortByYear, sortByTitle, movies])

  return { movies: sortedMovies, getMovies }
}
