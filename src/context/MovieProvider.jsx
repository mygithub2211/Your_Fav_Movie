/**
 * THIS PAGE IS FOR THE TRAILER BUTTON
 * PLAYS TRAILER
 */
// import PropTypes from "prop-types"
import { createContext, useState } from "react"
import Modal from 'react-modal'
import YouTube from 'react-youtube'

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    },
}

const MovieContext = createContext()

const MovieProvider = ({ children }) => {
    const [ modalIsOpen, setModalIsOpen ] = useState(false)
    const [ trailerKey, setTrailerKey ] = useState('')

    const handleTrailer = async (id, type = 'movie')  => {
        setTrailerKey('')
        try {
            const base = type === "movie" ? "movie" : "tv"
            const url = `https://api.themoviedb.org/3/${base}/${id}/videos?language=en-US`
            const options = {
                method: 'GET',
                headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
                }
            }

            const res = await fetch(url, options);
            const data = await res.json();
            if (data.results && data.results.length > 0) {
                setTrailerKey(data.results[0].key);
                setModalIsOpen(true);
            } else {
                console.warn("No trailer found");
                setModalIsOpen(false);
            }
        } catch (error) {
            setModalIsOpen(false)
            console.log("Trailer fetch error:", error)
        }
    }
    return (
        <MovieContext.Provider value={{handleTrailer}}>
            {children}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay: {
                        position: 'fixed',
                        zIndex: 9999
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
                contentLabel="Example Modal"
            >
                <YouTube videoId={trailerKey} opts={opts} />
            </Modal>
        </MovieContext.Provider>
    )
}
/*MovieProvider.propTypes = {
    children: PropTypes.node,
}*/

export {MovieProvider, MovieContext}