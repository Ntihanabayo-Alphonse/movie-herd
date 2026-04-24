import React, { useEffect, useState } from 'react'
import SingleTrends from '../../components/SingleTrends/SingleTrends';
import Pagination from '../../components/Pagination/Pagination';
import GenreFilter from '../../components/GenreFilter/GenreFilter';

const Movies = () => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [movies, setMovies] =  useState([])
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const fetchMovies = async () => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
    
    if (selectedGenres.length > 0) {
      url += `&with_genres=${selectedGenres.join(',')}`;
    }
    
    const response = await fetch(url)
    const data = await response.json()
    
    setMovies(data.results)
  }

  const handleGenreToggle = (genreId) => {
    setSelectedGenres(prev => {
      if (prev.includes(genreId)) {
        return prev.filter(id => id !== genreId);
      }
      return [...prev, genreId];
    });
    setPage(1);
  };

  useEffect(() => {
    fetchMovies()
  }, [page, selectedGenres])
  
  return (
    <div>
        <h2 className='page-title'>Movies</h2>
        <GenreFilter selectedGenres={selectedGenres} onGenreToggle={handleGenreToggle} />
        <div className="container">
          {movies && movies?.map((movie) => (
            
            <SingleTrends key={movie.id} 
            id={movie.id} 
            poster={movie.poster_path} 
            title={movie.title || movie.name} 
            date={movie.first_air_date || movie.release_date} 
            media_type={movie.media_type}
            vote_average={movie.vote_average} />
            
            ))
          }
        </div>
        <Pagination movies={movies} page={page} setPage={setPage}/>
    </div>
  )
}

export default Movies