import './App.css'
import { useMovies } from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import { useRef, useState, useEffect, useCallback } from 'react'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, seterror] = useState(null)
  const isFirstinput = useRef(true)

  useEffect(() => {
    if (isFirstinput.current) {
      isFirstinput.current = search === ''
      return
    }

    if (search === '') {
      seterror('We cannot find an empty search movie')
      return
    }

    if (search.length < 3) {
      seterror('Type at least a 3 characters movie name')
      return
    }

    seterror(null)
  }, [search])

  return { search, updateSearch, error }
}

export function App () {
  const [sortByYear, setSortByYear] = useState(false)
  const [sortByTitle, setSortByTitle] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search, sortByYear, sortByTitle })

  const debounceSearchMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
    setSortByYear(false)
    setSortByTitle(false)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    // getMovies({ search: newSearch })
    debounceSearchMovies(newSearch)
  }

  const handleCheckYear = () => {
    setSortByYear(!sortByYear)
  }

  const handleCheckTitle = () => {
    setSortByTitle(!sortByTitle)
  }

  return (
    <div className='main-page'>
      <header className='header-content'>
        <h1>Movie Searcher</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input name='search' value={search} placeholder='Spiderman, Avengers, Hulk...' onChange={handleChange} />
          <button type='submit'>Search</button>
          <div className='check'>
            <input type='checkbox' name='check' id='year' onChange={handleCheckYear} checked={sortByYear} />
            <label htmlFor='check'>Sort by year?</label>
          </div>
          <div className='check'>
            <input type='checkbox' name='check' id='title' onChange={handleCheckTitle} checked={sortByTitle} />
            <label htmlFor='check'>Sort by year?</label>
          </div>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>

      <main className='main-content'>
        <Movies movies={movies} />
      </main>
    </div>
  )
}
