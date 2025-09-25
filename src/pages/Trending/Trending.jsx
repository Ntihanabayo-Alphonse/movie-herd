import React from 'react'
import { useEffect, useState } from 'react';
import SingleTrends from '../../components/SingleTrends/SingleTrends';

const Trending = () => {
    const apiKey = import.meta.env.VITE_API_KEY;

    const [trending, setTrending] = useState([]);

    const FetchTrendingMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`);
        const data = await response.json();

        
        setTrending(data.results);
    }

    useEffect(() => {
        FetchTrendingMovies();
    }, []);
      

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
    </div>
  )
}

export default Trending