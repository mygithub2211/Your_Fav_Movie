import { useState, useEffect } from "react"
import Header from "./components/Header"
import AboutMe from "./components/AboutMe"
import MovieTVList from "./components/MovieTVList"
import MovieNowPlaying from "./components/MovieNowPlaying"
import { MovieProvider } from "./context/MovieProvider"
import { Routes, Route } from "react-router-dom"
import Detail from "./components/Detail"
import SearchPage from "./components/SearchPage"
import MovieAndTV from "./components/MovieAndTV"
import GenrePage from "./components/GenrePage"


function App() {
  const [ movieSearch, setMovieSearch ] = useState([])
  const [ movieNowPlaying, setMovieNowPlaying ] = useState([]) 
  const [ movieRate, setMovieRate ] = useState([])
  const [ movie, setMovie ] = useState([])
  const [ tvSeries, setTVSeries ] = useState([])

  // search function
  const handleSearch = async (searchVal) => {
    setMovieSearch([])
    if (!searchVal.trim()) return

    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      }

      const MAX_PAGES = 9 // controls how many results you get
      const requests = []

      for (let page = 1; page <= MAX_PAGES; page++) {
        requests.push(
          fetch(
            `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=en-US&page=${page}`,
            options
          ),
          fetch(
            `https://api.themoviedb.org/3/search/tv?query=${searchVal}&include_adult=false&language=en-US&page=${page}`,
            options
          )
        )
      }

      const responses = await Promise.all(requests)
      const jsonResults = await Promise.all(responses.map(r => r.json()))

      const combinedResults = jsonResults.flatMap((data, index) =>
        data.results.map(item => ({
          ...item,
          media_type: index % 2 === 0 ? "movie" : "tv",
        }))
      )

      setMovieSearch(combinedResults)
    } catch (error) {
      console.error("ERROR IN SEARCH:", error)
    }
  }

  // to fetch movies and TV shows
  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      }

      const url1 = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
      const url2 = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
      const url3 = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
      const url4 = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"

      const [res1, res2, res3, res4] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),
        fetch(url3, options),
        fetch(url4, options)
      ])

      const data1 = await res1.json()
      const data2 = await res2.json()
      const data3 = await res3.json()
      const data4 = await res4.json()

      setMovieNowPlaying(data1.results)
      setMovieRate(data2.results)
      setMovie(data3.results)
      setTVSeries(data4.results)
    }

    fetchMovie()
  }, [])

  return (
    <MovieProvider>
      <div className="bg-lightblack min-h-screen w-full overflow-x-hidden">
        {/* always visible on all pages */}
        <Header/>
        {/* only this part changes when navigating */}
        <Routes>
          {/* home page */}
          <Route 
            path="/" 
            element={
              <>
                <>
                  <MovieNowPlaying title="Now Playing" data={movieNowPlaying} />
                  <MovieTVList title="Top Rated Movies" data={movieRate} />
                  <MovieTVList title="Popular Movies" data={movie} />
                  <MovieTVList title="TV Shows" data={tvSeries} />
                </>
                <AboutMe />
              </>
            }
          />
          {/* movie page */}
          <Route 
            path="/movies"
            element={
              <>
                <MovieAndTV key="movie" title="Movies" type="movie"/>
                <AboutMe />
              </>
            }
          />
          {/* TV show page */}
          <Route 
            path="/tvshows"
            element={
              <>
                <MovieAndTV key="tv" title="TV Shows" type="tv" />
                <AboutMe />
              </>
            }
          />
          {/* other genres */}
          <Route 
            path="/genre/:genreName"
            element={
              <>
                <GenrePage />
                <AboutMe />
              </>
            }
          />
          {/* new search page */}
          <Route
            path="/search"
            element={<SearchPage onSearch={handleSearch} data={movieSearch} />}
          />
          {/* movie detail page */}
          <Route
            path="/movie/:id"
            element={
              <>
                <Detail type="movie"/>
                <AboutMe />
              </>
            }
          />
          {/* tv detail page */}
          <Route 
            path="/tv/:id" 
            element={
              <>
                <Detail type="tv" />
                <AboutMe />
              </>
            } 
          />
        </Routes>
      </div>
    </MovieProvider>
  )
}

export default App
