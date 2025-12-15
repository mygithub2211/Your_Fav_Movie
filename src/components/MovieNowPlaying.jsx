/**
 * THIS PAGE IS USED TO DISPLAY NOW_PLAYING MOVIES
 */
/* import PropTypes from "prop-types" */
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { Link } from "react-router-dom" 

const responsive = {
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
    items: 1,
  },
}

const MovieNowPlaying = ({ title, data }) => {
  return (
    <div className="text-white p-10 mb-10">
      <h2 className="uppercase text-3xl font-bold mb-4">{title}</h2>
      <Carousel responsive={responsive} itemClass="px-2" autoPlay={true} autoPlaySpeed={2500} infinite={true}>
        {data.length > 0 &&
          data.map((item) => (
            /* <Link> takes user to Detail.jsx */
            <Link to={`/movie/${item.id}`} key={item.id}>
              <div key={item.id} className="aspect-[2/3] relative group w-full ">
                <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer">
                  {/* shadow 50% of the picture */}
                  <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                    alt={item.title}
                    className="w-full h-full rounded-xl object-cover"
                  />
                  <div className="absolute bottom-2 left-0 w-full px-3">
                    {/*<p className="font-semibold text-[14px] ">{item.title || item.original_title}</p>*}
                    {/* Released Date + Rating (force wrapping)*/}
                    <div className="flex items-center w-full max-[1380px]:flex-wrap">
                      {/* released date */}
                      <div className="flex items-center gap-[2px] min-w-[120px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 text-yellow-400">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        <p className="font-bold text-[15px]">{item.release_date || item.first_air_date}</p>
                      </div>
                      {/* vote average - rating */}
                      <div className="flex items-center gap-[2px] min-w-[80px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-yellow-400 ">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                        <p className="font-bold text-[15px]">{item.vote_average} </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </Carousel>
    </div>
  )
}
/*MovieNowPlaying.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
}*/

export default MovieNowPlaying
