/**
 * THIS PAGE IS USED BY SearchPage.jsx, MovieAndTV.jsx, GenrePage.jsx 
 * FOR RESPONSIVE LAYOUT (ROWS + COLUMNS)
 */
// import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"

// stars for rating
const FullStar = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="currentColor" className={className}>
    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 
      5.006 5.404.434c1.164.093 1.636 1.545.749 
      2.305l-4.117 3.527 1.257 5.273c.271 
      1.136-.964 2.033-1.96 1.425L12 18.354 
      7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273
      -4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 
      2.082-5.005Z" />
  </svg>
)

const HalfStar = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    className={className} fill="currentColor">
    <defs>
      <linearGradient id="half-grad">
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="50%" stopColor="#9ca3af" stopOpacity="1"/>
      </linearGradient>
    </defs>
    <path fill="url(#half-grad)" d="M10.788 3.21c.448-1.077 1.976-1.077 
      2.424 0l2.082 5.006 5.404.434c1.164.093 
      1.636 1.545.749 2.305l-4.117 3.527 
      1.257 5.273c.271 1.136-.964 2.033-1.96 
      1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425 
      l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305
      l5.404-.434 2.082-5.005Z" />
  </svg>
)

const EmptyStar = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="currentColor" className={className}>
    <path
      fill="currentColor"
      className="text-gray-400"
      d="M12 2c.49 0 .94.29 1.13.75l2.07 4.99 
      5.19.42c.47.04.86.36 1.02.8.16.44.04.94-.31 
      1.26l-3.96 3.39 1.23 5.17c.11.46-.06.95-.43 
      1.24-.37.29-.88.33-1.29.1L12 18.27l-4.65 
      2.85c-.41.23-.92.19-1.29-.1-.37-.29-.54-.78-.43-1.24
      l1.23-5.17L3.9 10.22c-.35-.32-.47-.82-.31-1.26.16-.44.55-.76 
      1.02-.8l5.19-.42L12.87 2.75C13.06 2.29 13.5 2 14 2H12z"
    />
  </svg>
)

function MovieSearch ({ title, data }) {
  const [ cols, setCols ] = useState(2)
  
  useEffect(() => {
    const computeCols = () => {
      const w = window.innerWidth
      if (w >= 1025) return 5 // return 5 columns if it is a desktop
      if (w >= 640) return 4 // return 4 columns if it is a tablet
      return 2 // return 2 columns if it is a phone
    }
    const onResize = () => setCols(computeCols())
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])
  
  const pageSize = cols * 7 // 7 row max
  const pageData = useMemo(() => (data || []).slice(0, pageSize), [data, pageSize])
  
  return (
    // mobile (<640px) → 2 column
    // small screens (>=640px) → 4 columns 
    // laptops/desktops (>=1025px) → 5 columns
    <div className="text-white pr-10 pl-10">
      <h2 className="text-4xl font-bold mt-3 mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 min-[1025px]:grid-cols-5 gap-10">
        {pageData.length > 0 &&
          pageData.map((item) => (
            /* <Link> takes user to Detail.jsx */
            <Link to={item.title ? `/movie/${item.id}` : `/tv/${item.id}`}  key={item.id}>
              <div key={item.id} className="aspect-[2/3] relative group w-full max-w-[240px] mx-auto">
                <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer">
                  {/* shadow 50% of the picture */}
                  <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                    alt={item.title || item.original_title || item.name || item.original_name}
                    className="w-full h-full rounded-xl object-cover"
                  />
                  <div className="absolute bottom-2 left-0 w-full px-3">
                    {/*<p className="uppercase text-md ">{item.title || item.original_title}</p>*/}
                    {/* Released Date + Rating */}
                    <div className="flex items-center justify-between w-full">
                      {/* release date */}
                      <div className="flex items-center gap-[2px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-red-600">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        <p className="font-semibold text-[15px]">{item.release_date || item.first_air_date}</p>
                      </div>
                      {/* vote average */}
                      <div className="hidden lg:flex items-center gap-[2px]">  
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-yellow-400">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                        <p className="font-semibold text-[15px]">{item.vote_average}</p>
                      </div>
                    </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className="hidden min-[1030px]:flex absolute 
                    inset-0 bg-black/80 opacity-0 group-hover:opacity-100
                    transition-all duration-500 ease-in-out overflow-hidden
                    flex-col justify-center p-3 sm:p-4"
                  >
                    {/* content that slides up */}
                    <div className="transform translate-y-6 group-hover:translate-y-0 
                      transition-all duration-500 ease-in-out space-y-1 sm:space-y-2 min-w-0">
                      {/* title */}
                      <p className="font-semibold text-[20px]">{item.title || item.original_title || item.name || item.original_name}</p>
                      {/* release date */}
                      <div className="flex items-center gap-1 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                        strokeWidth="1.5" stroke="currentColor" className="size-5 text-red-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25M3 18.75A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75M3 18.75v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <p className="font-semibold text-[14px] text-red-600">{item.release_date || item.first_air_date}</p>
                      </div>
                      {/* Stars + Rating (do not force wrapping)*/}
                      <div className="flex items-center gap-[4px] w-full max-[1390px]:flex-wrap">
                        {/* stars — stay grouped */}
                        <div className="flex items-center gap-[1px]">
                          {(() => {
                            const rating = item.vote_average
                            const full = Math.floor(rating)
                            const half = rating % 1 >= 0.25 && rating % 1 <= 0.75 ? 1 : 0
                            const empty = 10 - full - half
                            return (
                              <>
                                {[...Array(full)].map((_, i) => (
                                  <FullStar key={`full-${i}`} className="size-4 text-yellow-400" />
                                ))}
                                {half === 1 && <HalfStar key="half" className="size-4" />}
                                {[...Array(empty)].map((_, i) => (
                                  <EmptyStar key={`empty-${i}`} className="size-4" />
                                ))}
                              </>
                            )
                          })()}
                        </div>
                         {/* vote average - rating */}
                        <p className="font-semibold text-[14px] text-yellow-400 ">({item.vote_average})</p>
                      </div>
                      {/* movie overview */}
                      <p className="text-[14px] line-clamp-5">{item.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

/*MovieSearch.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
}*/

export default MovieSearch
