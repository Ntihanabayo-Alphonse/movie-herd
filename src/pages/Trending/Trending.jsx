import React from 'react'
import { useEffect, useState } from 'react';

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
          {trending && trending?.map((trend) => console.log(trend))}
        </div>
    </div>
  )
}

export default Trending