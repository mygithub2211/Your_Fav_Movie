/**
 * HEADER OF THE APP
 */
/* import PropTypes from "prop-types" */
import { useState } from "react"
import { Link } from "react-router-dom"

function Header() {
    const [ openMenu, setOpenMenu ] = useState(false)
    const [ openGenres, setOpenGenres ] = useState(false)
    const [ openGenresDesktop, setOpenGenresDesktop ] = useState(false)
    const genres = [
        "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
        "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery",
        "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"
    ]

    return (
        <>
            <div className="p-4 bg-black flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {/* name of the app */}
                    <Link to="/" className="text-[35px] uppercase font-bold tracking-wide text-[#E50914]" onClick={() => setOpenMenu(false)}>Cinébox</Link>
                    {/* desktop menu (visible ≥1024px) */}
                    <nav className="hidden lg:flex items-center space-x-4 text-white text-[20px]">
                        {/* movies page */}
                        <Link to="/movies" className="hover:text-[#E50914] duration-150">Movies</Link>
                        {/* tv shows page */}
                        <Link to="/tvshows" className="hover:text-[#E50914] duration-150">TV Shows</Link>
                        {/* genres dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpenGenresDesktop(true)}
                            onMouseLeave={() => setOpenGenresDesktop(false)}
                        >
                            <button
                                className="text-white text-[20px] py-2 hover:text-[#E50914] duration-150"
                                onClick={() => setOpenGenresDesktop((v) => !v)}
                            >
                                Genres
                            </button>

                            {/* dropdown */}
                            <div
                                className={`
                                    absolute left-0 mt-2 w-[520px]
                                    bg-black/90 backdrop-blur-md border border-gray-700 rounded-xl
                                    shadow-xl p-5 z-50
                                    transition-all duration-300 ease-out
                                    ${openGenresDesktop ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`
                                }
                            >
                                <h3 className="text-gray-200 text-sm font-semibold mb-3 tracking-wide">Browse by Genre</h3>
                                <div className="grid grid-cols-4">
                                    {genres.map((genre) => (
                                        <Link
                                            key={genre}
                                            to={`/genre/${genre}`}
                                            onClick={() => setOpenGenresDesktop(false)}
                                            className="text-gray-300 text-[13.5px] hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                                        >
                                            {genre}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* search function */}
                        <Link to="/search" className="hover:text-[#E50914] duration-150">Search</Link>
                    </nav>
                </div>
                {/* mobile hamburger menu (visible <1024px) */}                 
                <button className="lg:hidden focus:outline-none" onClick={() => setOpenMenu(!openMenu)}>
                    <div className="space-y-1">
                        <div className="w-7 h-[3px] bg-white"></div>
                        <div className="w-7 h-[3px] bg-white"></div>
                        <div className="w-7 h-[3px] bg-white"></div>
                    </div>
                </button>   
            </div>
            {/* mobile menu */}
            {openMenu && (
                <div className="lg:hidden w-full bg-black text-white text-[18px] p-5 space-y-6 border-t border-gray-700">
                    <Link to="/movies" className="block hover:text-[#E50914] duration-150" onClick={() => setOpenMenu(false)}>
                        Movies
                    </Link>
                    <Link to="/tvshows" className="block hover:text-[#E50914] duration-150" onClick={() => setOpenMenu(false)}>
                        TV Shows
                    </Link>
                    {/* genres dropdown */}
                    <div>
                        <button className="w-full flex items-center gap-x-1 hover:text-[#E50914] duration-150" onClick={() => setOpenGenres(!openGenres)}>
                            Genres
                            {openGenres ? 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down hover:text-[#E50914]" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                </svg>:
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right hover:text-[#E50914]" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                </svg> 
                            }
                        </button>
                        {/* dropdown menu */}
                        {openGenres && (
                            <div className="mt-2 ml-2 space-y-2">
                                {genres.map((genre) => (
                                    <Link key={genre} to={`/genre/${genre}`} className="block text-gray-300 text-[16px] hover:text-white duration-150 " onClick={() => setOpenMenu(false)}>
                                        {genre}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* search function */}
                    <Link to="/search" className="block text-white hover:text-[#E50914] duration-200" onClick={() => setOpenMenu(false)}>Search</Link>
                </div>
            )}
        </>
    )
}

/*Header.propTypes = {
    onSearch: PropTypes.func
}*/

export default Header