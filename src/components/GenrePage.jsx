/**
 * THIS PAGE IS USED TO SHOW MOVIES AND TV SHOWS 
 * RELATED TO A SPECIFIC GENRE
 * PAGINATION LOCIC LIVES HERE
 * LAYOUT + RESPONSIVE COLUMNS LIVE IN MovieSearch.jsx
 */
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import MovieSearch from "./MovieSearch"

// objects
const GENRE_IDS = {
  "Action": 28, "Adventure": 12, "Animation": 16, "Comedy": 35, "Crime": 80,
  "Documentary": 99, "Drama": 18, "Family": 10751, "Fantasy": 14, "History": 36,
  "Horror": 27, "Music": 10402, "Mystery": 9648, "Romance": 10749,
  "Science Fiction": 878, "TV Movie": 10770, "Thriller": 53,
  "War": 10752, "Western": 37
}

function GenrePage() {
  const { genreName } = useParams()
  const genreId = GENRE_IDS[genreName]
  const [ items, setItems ] = useState([])
  const [ page, setPage ] = useState(1)
  const prevGenreIdRef = useRef(null)
  const TOTAL_PAGES = 200

  useEffect(() => {
    if (!genreId) return
    const genreChanged = prevGenreIdRef.current !== genreId
    prevGenreIdRef.current = genreId
    if (genreChanged && page !== 1) {
      setPage(1)
      return
    }
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
        const movieUrl1 = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}`
        const movieUrl2 = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page + 1}`
        const tvUrl1 = `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&page=${page}`
        const tvUrl2 = `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&page=${page + 1}`
        const responses = await Promise.all([
          fetch(movieUrl1, options),
          fetch(movieUrl2, options),
          fetch(tvUrl1, options),
          fetch(tvUrl2, options),
        ])
        const results = await Promise.all(responses.map(r => r.json()))
        setItems([
          ...(results[0].results || []),
          ...(results[1].results || []),
          ...(results[2].results || []),
          ...(results[3].results || []),
        ])
        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch (err) {
        console.log("Genre load error:", err)
      }
    }
    fetchData()
  }, [genreId, page])

  // pagination
  const renderPageNumbers = () => {
    const nums = []
    const add = (p) => (
      <button
        key={p}
        onClick={() => setPage(p)}
        className={`px-3 py-1 rounded-md ${
          p === page
            ? "bg-red-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-500"
        }`}
      >
        {p}
      </button>
    )
    nums.push(add(1))
    if (page > 4) {
      nums.push(<span key="dots1">…</span>)
    }
    const start = Math.max(2, page - 2)
    const end = Math.min(TOTAL_PAGES - 1, page + 2)
    for (let i = start; i <= end; i++) {
      nums.push(add(i))
    }
    if (page < TOTAL_PAGES - 3) {
      nums.push(<span key="dots2">…</span>)
    }
    nums.push(add(TOTAL_PAGES))
    return nums
  }

  return (
    <div className="text-white">
      {/* call MovieSearch.jsx for layout */}
      {items.length > 0 && <MovieSearch title={genreName} data={items} />}
      {/* prev and next buttons */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex items-center gap-3 pb-10">
          {/* prev button */}
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md ${
              page === 1 ? "bg-gray-600" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            &lt;
          </button>
          <div className="flex items-center gap-2">{renderPageNumbers()}</div>
          {/* next button */}
          <button
            onClick={() => setPage(p => Math.min(p + 1, TOTAL_PAGES))}
            disabled={page === TOTAL_PAGES}
            className={`px-4 py-2 rounded-md ${
              page === TOTAL_PAGES
                ? "bg-gray-600"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default GenrePage
