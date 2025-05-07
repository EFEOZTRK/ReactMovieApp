const API_KEY = import.meta.env.VITE_API_KEY;


export const genreSelect = async()=>{
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?with_genres=28&language=en-US&page=1', {
    
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      
   })
   
   const data = await response.json()
    return data;
    
}