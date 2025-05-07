import React, { useEffect, useState } from 'react';
import "../style/Filter.css";
import "../style/Movie.css";
import "../style/Popup.css"
import { fetchGenre } from '../API/Genre.jsx';

// Icons
import { FaHome } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdOutlineUpcoming } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { MdMovieCreation, MdLocalMovies } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";



function Main({ hamburger , light }) {
  const API_KEY = import.meta.env.VITE_API_KEY;

  // === State ===
  const [movies, setPopular] = useState([]);
  const [list, setList] = useState("popular");
  const [genreId, setGenreId] = useState([]);
  const [selectedCategory, setCategory] = useState("Popular Movies");
  const [pageNum, setPageNum] = useState(1);
  const [selectedId, setSelectedId] = useState();

  const [genreAssign,setGenreAssign] = useState([]);

  const [pop,setPop] = useState(false);
  const [title,setTitle] = useState("")
  const [img,setImg] = useState("")
  const [date,setDate] = useState("")
  const [vote,setVote] = useState("")
  const [genre_Id,setId] = useState("")
  const [description,setDescription] = useState("")

  // === Fetch popular/now_playing/upcoming/top_rated movies ===
  const fetchMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${list}?language=en-US&page=1`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
      }
    });
    const data = await res.json();
    setPopular(data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, [list]);

  // === Fetch genres ===
  useEffect(() => {
    const getGenre = async () => {
      const genres = await fetchGenre();
      setGenreId(genres);
    };
    getGenre();
  }, []);

  // === Fetch by genre ===
  const genreSelect = async (id, name) => {
    setPageNum(1);
    setCategory(name);
    setSelectedId(id);

    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=en-US&page=1`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );
    const data = await res.json();
    setPopular(data.results);
  };

  // === Load More (only works for genre-based categories) ===
  const loadMore = async () => {
    const nextPage = pageNum + 1;
    setPageNum(nextPage);

    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedId}&language=en-US&page=${nextPage}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    const data = await res.json();
    setPopular(prev => [...prev, ...data.results]);
  };

  // === Filter Button Actions ===
  const home = () => {
    setList("popular")
    fetchMovies();
    setCategory("Popular Movies");
  };

  const now_playing = () => {
    setList("now_playing");
    fetchMovies();
    setCategory("Now Playing");
  };

  const upcoming = () => {
    setList("upcoming");
    fetchMovies();
    setCategory("Upcoming");
  };

  const top_rated = () => {
    setList("top_rated");
    fetchMovies();
    setCategory("Top Rated");
  };


  const genreAssignerFunction = (ids) => {
    return genreId
      .filter(g => ids.includes(g.id))
      .map(g => g.name);
  };
  
  const movieCardFunction = (title, img, date, vote, id, desc, genreIds) => {
    setTitle(title);
    setImg(img);
    setDate(date);
    setVote(vote);
    setId(id);
    setDescription(desc);
    setPop(true);
  
    const genreArray = genreAssignerFunction(id);
    setGenreAssign([...genreArray]);
    
  };


 
  // Add to favorites button 

  const addFavorites = async ()=>{
    const usernameLocal = localStorage.getItem("username")
    const movieData = {title: title , img: img, date: date, vote: vote , username : usernameLocal };

   await fetch("http://localhost:3000/favorites", {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(movieData)
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        setCheck(c=> [...check, title])
      }
    })
  }

  // check variable for adding icon if already added to favorites
 
  const [check,setCheck] = useState([]);


  

  
  
  

  // === Render ===
  return (
    <div className="main-container">
      <div onClick={()=>setPop(false)} className={`background-filter ${pop ? "active": ""}`}></div>
      {/* Filter Sidebar */}
      <div className={`filter-container  ${hamburger ? "active" : ""}`}>

        <div onClick={home} className={`button-home ${light ? "light" : ""}`}>
          <div className={`home-icon ${light ? "light" : ""}`}><FaHome /></div>
          <div className={`home ${light ? "light" : ""}`}>Home</div>
        </div>

        <div className="break"></div>

        <div onClick={now_playing} className={`button-now-playing ${light ? "light" : ""}`}>
          <div className={`now-playing-icon ${light ? "light" : ""}`}><FaRegCirclePlay /></div>
          <div className={`now-playing ${light ? "light" : ""}`}>Now Playing</div>
        </div>

        <div onClick={upcoming} className={`button-upcoming ${light ? "light" : ""}`}>
          <div className={`upcoming-icon ${light ? "light" : ""}`}><MdOutlineUpcoming /></div>
          <div className={`upcoming ${light ? "light" : ""}`}>Upcoming</div>
        </div>

        <div onClick={top_rated} className={`button-top-rated ${light ? "light" : ""}`}>
          <div className={`top-rated-icon ${light ? "light" : ""}`}><FaRegStar /></div>
          <div className={`top-rated ${light ? "light" : ""}`}>Top Rated</div>
        </div>

        <div className={`break ${light ? "light" : ""}`}></div>

        <div className={`categorys ${light ? "light" : ""}`}>
          <div className={`categories-icon ${light ? "light" : ""}`}><RiMovie2Line /></div>
          <div className={`categories ${light ? "light" : ""}`}>Categories</div>
        </div>

        {/* Genre Buttons */}
        {genreId.map((g) => (
          <div
            key={g.id}
            id={g.id}
            className={`genre-names ${light ? "light" : ""}`}
            onClick={() => genreSelect(g.id, g.name)}
          >
            <div className={`genre-icon ${light ? "light" : ""}`}><MdMovieCreation /></div>
            <div className={`names ${light ? "light" : ""}`}>{g.name}</div>
          </div>
        ))}

      </div>

      {/* Movies Section */}
      <div className={`movie-container ${light ? "light" : ""}`}>
        <div className="category-name">
          <div className={`category-icon ${light ? "light" : ""}`}><MdMovieCreation /></div>
          <div className={`category ${light ? "light" : ""}`}>{selectedCategory}</div>
        </div>

        {movies.map((movie) => (
          <div onClick={()=> movieCardFunction(
            movie.title,movie.poster_path,movie.release_date,movie.vote_average,movie.genre_ids,movie.overview
          )} key={movie.id} className={`movie-card ${light ? "light" : ""}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
            <p className={`movie-text ${light ? "light" : ""}`}>{movie.title}</p>

            <div className="description">
              <div className="votes">
                <p className={`vote-text ${light ? "light" : ""}`}>Rating</p>
                <p className={`vote-count ${light ? "light" : ""}`}>{Math.round(movie.vote_average)}/10</p>
              </div>
              <div className="time">
                <p className={`time-text ${light ? "light" : ""}`}>Release Date</p>
                <p className={`time-count ${light ? "light" : ""}`}>{movie.release_date}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Load More Button (only appears when genre selected) */}
        {selectedId && (
          <div className="page-number-buttons">
            <div onClick={loadMore} className="load-more">Load more</div>
          </div>
        )}
          {/*Movie popup card */} 
        <div className={`movie-card-popup ${pop ? "active" : ""} ${light ? "light" : ""}`}>
          <div className="img-container">
            <img src={`https://image.tmdb.org/t/p/w500/${img}`} alt="" />
          </div>
          <div className={`description-container ${light ? "light" : ""}`}>
            <div className="exit-pop">
              <div onClick={()=> setPop(false)} className={`exit-pop-icon ${light ? "light" : ""}`}><IoCloseOutline /></div>
            </div>
            <div className={`img-header ${light ? "light" : ""}`}>{title.toUpperCase()}</div>
            <div className="year-hour-genre">
              <div className="year">{date}</div>
              <div className="hour">2H 20M</div>
              <div className="genre-container">
              {genreAssign.map((g,i)=>{
              return <div id={i} key={i} className="genre">{g}</div>
              })}
              </div>
            </div>
            <div className={`description ${light ? "light" : ""}`}>{description ? description : "Description not provided"}</div>
            <div className="rating">Rating: 
              <div className="vote">{Math.round(vote)}</div>
            </div>

            <div className="watch-container">
            <div onClick={addFavorites} className={`watch ${light ? "light" : ""}`}>Favorite  {check.includes(title) ? <FaCheck/> : ""} </div>
            <div className="movie">Watch Movie</div>
          </div>

          </div>
          
        </div>


      </div>
    </div>
  );
}

export default Main;
