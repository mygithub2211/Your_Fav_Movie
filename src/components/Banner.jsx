/**
 * THIS PAGE IS CURRENTLY NOT IN USE
 */
import ImgTemp from "../assets/temp-1.jpg"
import IconPlay from "../assets/play-button.png"
import { useContext } from "react"
import { MovieContext } from "../context/MovieProvider"

const Banner = ({ data }) => {
  const { handleTrailer } = useContext(MovieContext)
  const movie = data.find(
    (item) =>
      item.title.toLowerCase() === "the shadow's edge" ||
      item.original_title.toLowerCase() === "the shadow's edge"
  )

  return (
    <div className="w-full h-[900px] overflow-hidden relative text-white">
      <img
        src="/banner.webp"
        alt="banner"
        className="absolute left-0 w-full h-[900px] object-cover object-top"
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-[#141414]" />
      {/* smooth fade into cast section */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-b from-transparent to-[#141414]" />
      <div className="w-full h-full flex items-center justify-center space-x-[30px] p-4 relative z-20">
        <div className="flex flex-col space-y-5 items-baseline w-[50%]">
          {/*<p className="bg-gradient-to-r from-red-600 to-red-300 text-md py-2 px-3">Movies</p>*/}
          <div className="flex flex-col items-space-y-4">
            <h2 className="text-[70px] font-bold">The Shadow"s Edge</h2>
            <p className="mb-1">{movie?.overview}</p>
            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center gap-1 px-3 py-2 bg-white text-black hover:bg-gray-200 rounded-md shadow transition font-semibold"
                onClick={() => handleTrailer(movie?.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                </svg>
                Watch Trailer
              </button>
              <button className="flex items-center gap-1 px-3 py-2 bg-white/20 hover:bg-white/30 text-white transition rounded-md shadow font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
                More Info
              </button>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <div className="w-[300px] h-[400px] relative group cursor-pointer">
            <img src={ImgTemp} alt="temp" className="w-full h-full object-cover" />
            <div 
              className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
              onClick={() => handleTrailer(movie?.id)}
            >
              <img src={IconPlay} alt="play" className="w-16 h-16"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner