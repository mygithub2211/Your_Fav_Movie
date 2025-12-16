/**
 * THIS PAGE IS USED TO SEARCH FOR MOVIES
 * PAGINATION LOCIC LIVES HERE
 * LAYOUT + RESPONSIVE COLUMNS LIVE IN MovieSearch.jsx
 */
import { useEffect, useMemo, useState } from "react"
import MovieSearch from "./MovieSearch"
import AboutMe from "./AboutMe"

const PAGE_SIZE = 35 // max (5 cols × 7 rows)

function SearchPage ({ onSearch, data }) {
  const [ text, setText ] = useState("")
  const [ page, setPage ] = useState(1)

  // reset page when new search results arrive
  useEffect(() => {
    setPage(1)
  }, [data])

  const totalPages = Math.ceil((data?.length || 0) / PAGE_SIZE)
  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return data.slice(start, start + PAGE_SIZE)
  }, [data, page])

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
      nums.push(<span key="dots-start">…</span>)
    }

    const start = Math.max(2, page - 2)
    const end = Math.min(totalPages - 1, page + 2)
    for (let i = start; i <= end; i++) {
      nums.push(add(i))
    }

    if (page < totalPages - 3) {
      nums.push(<span key="dots-end">…</span>)
    }

    if (totalPages > 1) {
      nums.push(add(totalPages))
    }

    return nums
  }

  return (
    <div className="text-white pt-5 pb-2">
      {/* search bar */}
      <div className="flex items-center gap-3 mb-10 justify-center">
        <input
          type="text"
          placeholder="Search for movies..."
          className="p-2 w-[300px] sm:w-[600px] lg:w-[900px] text-black rounded-md"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="p-2 bg-red-600 text-white rounded-md"
          onClick={() => onSearch(text)}
        >
          Search
        </button>
      </div>
      {/* results */}
      {pageData.length > 0 && (
        <>
          {/* call MovieSearch.jsx for layout */}
          <MovieSearch title="Search Results" data={pageData} />
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 mt-6 pb-10">
              <div className="flex items-center gap-3">
                {/* prev */}
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
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

                {/* next */}
                <button
                  onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-md ${
                    page === totalPages
                      ? "bg-gray-600"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
          <AboutMe />
        </>
      )}
    </div>
  )
}

export default SearchPage
