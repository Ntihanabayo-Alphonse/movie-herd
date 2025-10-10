import React from 'react'
import { useEffect, useState } from 'react';
import SingleTrends from '../../components/SingleTrends/SingleTrends';
import './Trending.css'
import Pagination from '../../components/Pagination/Pagination';

const Trending = () => {
    const apiKey = import.meta.env.VITE_API_KEY;

    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);

    const FetchTrendingMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`);
        const data = await response.json();

        
        setTrending(data.results);
    }

    useEffect(() => {
        FetchTrendingMovies();
    }, [page]);
      

  return (
    <div>
        <h2 className='page-title'>Trending</h2>
        <div className="trending">
          {trending && trending?.map((trend) => (
            
            <SingleTrends key={trend.id} 
            id={trend.id} 
            poster={trend.poster_path} 
            title={trend.title || trend.name} 
            date={trend.first_air_date || trend.release_date} 
            media_type={trend.media_type}
            vote_average={trend.vote_average} />
            
            ))
          }
        </div>
        <Pagination movies={trending} page={page} setPage={setPage}/>
    </div>
  )
}

export default Trending