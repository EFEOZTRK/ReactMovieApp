import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";



function FavoriteMovies({ userInfo }) {

  const [movies,setMovies] = useState([]);
 
  
      

  useEffect(()=>{
    setMovies(userInfo.favorites)
  },[userInfo.favorites])  
  
  console.log(userInfo);
  
  return (

    <>
    <div className="movie-card-profile">
      <h1 className='header'>{movies.length>0 ? "Favorite Movies" : "You dont have any favorite movies yet"} <div className='favorite-icon'>
        {movies.length>0 ? <CiStar/> : "!"}
      </div> </h1>  
    {movies.map((movie) => (
          <div key={movie.title} className={`movie-card`}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.img}`} alt="" />
            <p className={`movie-text `}>{movie.title}</p>

            <div className="description">
              <div className="votes">
                <p className={`vote-text `}>Rating</p>
                <p className={`vote-count `}>{Math.round(movie.vote)}/10</p>
              </div>
              <div className="time">
                <p className={`time-text`}>Release Date</p>
                <p className={`time-count`}>{movie.date}</p>
              </div>
            </div>
          </div>
          
        ))}
        </div>
    </>
  )
}

export default FavoriteMovies