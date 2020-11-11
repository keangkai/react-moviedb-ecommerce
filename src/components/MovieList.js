import React from 'react'
import Movie from "./Movie"

const MovieList = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    {
                        props.movies.map((movie, i) => {
                            return <Movie 
                                    key={i} 
                                    movieId={movie.id} 
                                    name={movie.title}
                                    price={movie.vote_average} 
                                    image={movie.poster_path} 
                                    handleIncrease={props.handleIncrease} 
                                    getMovie={props.getMovie}
                                />
                        })
                    }
                </div>
            </div>           
        </div>
    )
}

export default MovieList
