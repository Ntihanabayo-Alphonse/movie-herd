import React, { useState, useEffect } from 'react'
import SingleTrends from '../../components/SingleTrends/SingleTrends';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
      );
      const data = await response.json();
      
      const filteredResults = data.results.filter(
        (item) => item.media_type === 'movie' || item.media_type === 'tv'
      );
      
      setSearchResults(filteredResults.slice(0, 20));
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      fetchSearchResults(searchTerm);
    }, 500);

    setDebounceTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div>
        <h2 className='page-title'>Search</h2>
        
        <div className="search-container">
            <div className="search-input-wrapper">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for movies or TV shows..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {searchTerm && (
                    <button className="search-clear" onClick={clearSearch}>
                        ×
                    </button>
                )}
            </div>
            
            {loading && (
                <div className="search-loading">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </div>

        {!loading && searchTerm && searchResults.length === 0 && (
            <div className="search-no-results">
                <p>No results found for "{searchTerm}"</p>
                <p className="search-suggestion">Try searching for something else</p>
            </div>
        )}

        {!searchTerm && (
            <div className="search-empty">
                <p>Start typing to search for movies and TV shows</p>
            </div>
        )}

        <div className="search-results">
            {searchResults.map((item) => (
                <SingleTrends 
                    key={item.id} 
                    id={item.id} 
                    poster={item.poster_path} 
                    title={item.title || item.name} 
                    date={item.first_air_date || item.release_date} 
                    media_type={item.media_type === 'movie' ? 'Movie' : 'TV Show'}
                    vote_average={item.vote_average} 
                />
            ))}
        </div>
    </div>
  )
}

export default Search