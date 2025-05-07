const API_KEY = import.meta.env.VITE_API_KEY;




 export  const fetchGenre = async ()=>{

   const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
    
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      
   })
   
   const data = await response.json()
    return data.genres;
    
  }