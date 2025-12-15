/**
 * THIS PAGE SHOWS DETAIL OF A MOVIE
 */
import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { Link } from "react-router-dom"
import { MovieContext } from "../context/MovieProvider"

const responsiveCast = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3001 },
        items: 7,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1025 },
        items: 6,
    },
    tablet: {
        breakpoint: { max: 1024, min: 601 },
        items: 5,
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 2,
    },
}

const responsiveSimilar = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3001 },
        items: 6,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1025 },
        items: 5, 
    },
    tablet: {
        breakpoint: { max: 1024, min: 601 },
        items: 4,
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 2,
    },
}

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

function Detail({ type }) {
    const { id } = useParams()
    const isMovie = type === "movie"
    const [movie, setMovie] = useState(null)
    const [cast, setCast] = useState([])
    const [similar, setSimilar] = useState([])
    const { handleTrailer } = useContext(MovieContext)
    
    useEffect(() => {
        const fetchMovie = async () => {
            const options = {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                }
            }

            const base = isMovie ? "movie" : "tv"
            const urlDetail  = `https://api.themoviedb.org/3/${base}/${id}?language=en-US`
            const urlCredits = `https://api.themoviedb.org/3/${base}/${id}/credits?language=en-US`
            const urlSimilar = `https://api.themoviedb.org/3/${base}/${id}/similar?language=en-US&page=1`
            
            const [detailRes, castRes, similarRes] = await Promise.all([
                fetch(urlDetail, options),
                fetch(urlCredits, options),
                fetch(urlSimilar, options)
            ])

            const detailData = await detailRes.json()
            const castData = await castRes.json()
            const similarData = await similarRes.json()

            setMovie(detailData)
            setCast(castData.cast)
            setSimilar(similarData.results)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
        fetchMovie()
    }, [id, type])

    if (!movie) {
        return <div className="text-white p-10">Loading...</div>
    }

    return (
        <div className="text-white">
            {/* backdrop section */}
            <div className="relative w-full">
                {/* big background */}
                <div 
                    className="absolute inset-0 bg-cover bg-center scale-120  lg:blur-0 lg:scale-100"
                    style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}}
                />
                {/* dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-[#141414]" />
                {/* content */}
                <div className="relative z-10 min-h-screen  
                        pt-[calc(8rem+env(safe-area-inset-top))] pb-16 
                        flex flex-col items-center lg:px-14 lg:items-end lg:flex-row gap-8 lg:gap-12"
                >
                    {/* poster */}
                    <img
                        src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
                        alt={movie.title || movie.name}
                        className="w-[300px] aspect-[2/3] rounded-2xl shadow-2xl border border-white/10"
                    />
                    {/* movie info */}
                    <div className="flex-1 text-left ml-5">
                        {/* title */}
                        <h1 className="text-4xl lg:text-6xl lg:font-bold leading-tight mb-1">{movie.title || movie.name}</h1>
                        {/* tagline */}
                        {movie.tagline && (<p className="italic text-gray-300 mb-4">{movie.tagline}</p>)}
                        {/* genres */}
                        <div className="flex flex-wrap justify-start gap-3 mb-4">
                            {movie.genres?.map(g => (
                            <span key={g.id} className="px-3 py-1 border border-blue-300 text-blue-200 rounded-full">
                                {g.name}
                            </span>
                            ))}
                        </div>
                        {/* movie data */}
                        <div className="flex flex-wrap justify-start gap-3 text-gray-300 mb-5">
                            {/* release date */}
                            <div className="flex items-center gap-1"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-red-600"> 
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /> 
                                </svg> 
                                <p className="font-semibold text-[15px]">{movie.release_date || movie.first_air_date}</p> 
                            </div>
                            {/* vote average */}
                            <div className="flex items-center gap-1"> 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-yellow-400"> 
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /> 
                                </svg> 
                                <p className="font-semibold text-[15px]">{movie.vote_average}</p> 
                            </div>
                            {/* runtime */}
                            <div className="flex items-center gap-1"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hourglass-split text-amber-500" viewBox="0 0 16 16"> 
                                    <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/> 
                                </svg> 
                                <p className="font-semibold text-[15px]">{(movie.runtime || movie.episode_run_time?.[0])} min</p>   
                            </div>
                            {/* number of episodes (TV only) */}
                            {!isMovie && movie.number_of_episodes && ( 
                                <div className="flex items-center gap-1"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-collection-play-fill" viewBox="0 0 16 16"> 
                                        <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437"/> 
                                    </svg> 
                                    <p className="font-semibold text-[15px]"> Episodes: {movie.number_of_episodes} </p> 
                                </div> 
                            )}
                            {/* number of seasons (TV only) */}
                            {!isMovie && movie.number_of_seasons && ( 
                                <div className="flex items-center gap-1"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square text-purple-400" viewBox="0 0 16 16"> 
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/> 
                                    </svg> 
                                    <p className="font-semibold text-[15px]"> Seasons: {movie.number_of_seasons} </p> 
                                </div> 
                            )}
                            {/* homepage */}
                            <div className="flex items-center gap-1"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-5 bi bi-house-door-fill text-blue-500" viewBox="0 0 16 16">  
                                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/> 
                                </svg> 
                                <a href={movie.homepage} target="_blank" className="font-semibold text-[15px] underline text-blue-300">{movie.homepage}</a> 
                            </div> 
                        </div>
                        {/* overview (short on mobile) */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl mt-2 mb-1">Overview</h2>
                            <p className="text-gray-300 text-sm lg:text-[16px] leading-relaxed mb-4">{movie.overview}</p>
                        </div>
                        {/* trailer button */}
                        <button
                            onClick={() => handleTrailer(movie.id, isMovie ? "movie" : "tv")}
                            className=" inline-flex items-center gap-2 px-3 py-2 mt-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-8 bi bi-play-fill" viewBox="0 0 16 16"> 
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/> 
                            </svg>
                            Watch Trailer
                        </button>
                    </div>
                </div>
            </div>
            {/* casts + similar movies */}
            <div className="px-4 sm:px-8 lg:px-14 py-12">
                {/* cast + carousel function */}
                <h2 className="uppercase text-2xl font-bold mt-15 mb-4">Casts</h2>
                <Carousel responsive={responsiveCast} itemClass="px-3" autoPlay={true} autoPlaySpeed={2500} infinite={true}>
                    {cast.slice(0, 20).map((actor) => (
                        <div key={actor.id} className="aspect-[2/3] relative group w-full">
                            <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer">
                                {/* shadow 50% of the picture */}
                                <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                                <img
                                    src={actor.profile_path? 
                                        `${import.meta.env.VITE_IMG_URL}${actor.profile_path}`
                                        : 
                                        "https://via.placeholder.com/300x450/000000/FFFFFF?text=No+Image"
                                    }
                                    alt={actor.name}
                                    className="w-full h-full rounded-xl object-cover"
                                />
                                {/* name + character */}
                                <div className="absolute bottom-2 left-0 w-full px-3">
                                    <p className="text-[15px] font-semibold">{actor.name}</p>
                                    <p className="text-[13px] text-gray-300">{actor.character}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
                {/* similar movie + carousel function*/}
                {similar.length > 0 && (
                    <div className="mt-20">
                        <h2 className="uppercase text-2xl font-bold mb-4">Recommended</h2>
                        <Carousel responsive={responsiveSimilar} itemClass="px-3">
                            {similar.map((item) => (
                                /* <Link> takes user to Detail.jsx */
                                <Link to={item.title ? `/movie/${item.id}` : `/tv/${item.id}`}  key={item.id}>
                                    <div key={item.id} className="aspect-[2/3] relative group w-full">
                                        <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer">
                                            {/* shadow 50% of the picture */}
                                            <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                                            <img
                                                src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                                                alt={item.title}
                                                className="w-full h-full rounded-xl object-cover"
                                            />
                                            <div className="absolute bottom-2 left-0 w-full px-3">
                                                {/*<p className="uppercase text-md ">{item.title || item.original_title}</p>*/}
                                                {/* Released Date + Rating */}
                                                <div className="flex items-center justify-between w-full">
                                                    {/* release date */}
                                                    <div className="flex items-center gap-[2px]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-red-600 flex-shrink-0">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                                        </svg>
                                                        <p className="font-semibold text-[15px]">{item.release_date || item.first_air_date}</p>
                                                    </div>
                                                    {/* vote average - rating */}
                                                    <div className="hidden xl:flex items-center gap-[2px]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-yellow-400 flex-shrink-0">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="font-semibold text-[15px]">{item.vote_average}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Hover Overlay*/}
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
                                                    {/* Stars + Rating (do not force wrapping) */}
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
                        </Carousel>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Detail
