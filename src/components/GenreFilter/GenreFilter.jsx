import React from 'react';
import './GenreFilter.css';

export const movieGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10749, name: 'Romance' },
  { id: 36, name: 'History' },
  { id: 9648, name: 'Mystery' },
];

export const seriesGenres = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10768, name: 'War & Politics' },
  { id: 37, name: 'Western' },
];

const GenreFilter = ({ selectedGenres, onGenreToggle, genres = movieGenres }) => {
  return (
    <div className="genre-filter">
      <div className="genre-buttons">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`genre-btn ${selectedGenres.includes(genre.id) ? 'active' : ''}`}
            onClick={() => onGenreToggle(genre.id)}
          >
            {genre.name}
            {selectedGenres.includes(genre.id) && (
              <span className="genre-remove">×</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;