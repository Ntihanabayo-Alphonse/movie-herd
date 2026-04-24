import React, { useState, useEffect } from 'react'
import SingleTrends from '../../components/SingleTrends/SingleTrends';
import Pagination from '../../components/Pagination/Pagination';
import GenreFilter, { seriesGenres } from '../../components/GenreFilter/GenreFilter';

const Series = () => {
  const [series, setSeries] = useState([])
  const [page, setPage] = useState(1)
  const [selectedGenres, setSelectedGenres] = useState([])

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchSeries = async () => {
    let url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
    
    if (selectedGenres.length > 0) {
      url += `&with_genres=${selectedGenres.join(',')}`;
    }
    
    const response = await fetch(url)
    const data = await response.json()

    setSeries(data.results)
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
    fetchSeries()
  }, [page, selectedGenres])

  return (
    <div>
      <h2 className='page-title'>Tv Series</h2>
      <GenreFilter selectedGenres={selectedGenres} onGenreToggle={handleGenreToggle} genres={seriesGenres} />
      <div className="container">
        {series && series?.map((serie) => (

          <SingleTrends key={serie.id}
            id={serie.id}
            poster={serie.poster_path}
            title={serie.title || serie.name}
            date={serie.first_air_date || serie.release_date}
            media_type={serie.media_type === "movie" ? "Movie" : "Tv Serie"}
            vote_average={serie.vote_average} />
        ))

        }
      </div>

      <Pagination series={series} page={page} setPage={setPage} />
    </div>
  )
}

export default Series