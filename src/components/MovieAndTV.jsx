/**
 * THIS PAGE IS USED TO SHOW MOVIES OR TV SHOWS 
 * BY CLICKING ON "Movies" AND "TV Shows" ON THE HEADER
 * PAGINATION LOCIC LIVES HERE
 * LAYOUT + RESPONSIVE COLUMNS LIVE IN MovieSearch.jsx
 */
import { useEffect, useState } from "react"
import MovieSearch from "./MovieSearch"

function MovieAndTV({ title, type }) {
  const [ items, setItems ] = useState([])
  const [ page, setPage ] = useState(1)
  const TOTAL_PAGES = 200

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = ""
        if (type === "movie") {
          endpoint = "movie/top_rated"
        } else {
          endpoint = "tv/popular"
        }
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
        const url1 = `https://api.themoviedb.org/3/${endpoint}?language=en-US&page=${page}`
        const url2 = `https://api.themoviedb.org/3/${endpoint}?language=en-US&page=${page + 1}`
        const responses = await Promise.all([
          fetch(url1, options),
          fetch(url2, options),
        ])
        const results = await Promise.all(responses.map(r => r.json()))
        const combined = [
          ...(results[0].results || []),
          ...(results[1].results || []),
        ]
        setItems(combined)
        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch (err) {
        console.log("Load error:", err)
      }
    }
    fetchData()
  }, [page, type])

  // pagination
  const renderPageNumbers = () => {
    const nums = []
    const add = (p) => {
      return (
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
    }
    nums.push(add(1))
    if (page > 4) {
      nums.push(<span key="dots-start">…</span>)
    }
    
    const start = Math.max(2, page - 2)
    const end = Math.min(TOTAL_PAGES - 1, page + 2)
    for (let i = start; i <= end; i++) {
      nums.push(add(i))
    }
    if (page < TOTAL_PAGES - 3) {
      nums.push(<span key="dots-end">…</span>)
    }
    nums.push(add(TOTAL_PAGES))
    return nums
  }

  return (
    <div className="text-white">
      {/* call MovieSearch.jsx for layout */}
      {items.length > 0 && <MovieSearch title={title} data={items} />}
      {/* prev and next buttons */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex items-center gap-3 pb-10">
          {/* prev button */}
          <button
            onClick={() => {
              if (page > 1) {
                setPage(page - 1)
              }
            }}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md ${
              page === 1
                ? "bg-gray-600"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            &lt;
          </button>
          <div className="flex items-center gap-2">
            {renderPageNumbers()}
          </div>
          {/* next button */}
          <button
            onClick={() => {
              if (page < TOTAL_PAGES) {
                setPage(page + 1)
              }
            }}
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

export default MovieAndTV
