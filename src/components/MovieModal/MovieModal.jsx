import { useState, useEffect, useRef } from 'react';
import { img_300, img_500, unavailable, unavailableLandscape } from '../../config/config';
import './MovieModal.css';

const MovieModal = ({ movie, mediaType, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_API_KEY;

  // Refs for carousel scrolling
  const castScrollRef = useRef(null);
  const similarScrollRef = useRef(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movie) return;
      
      setLoading(true);
      
      try {
        // Fetch movie details (includes backdrop_path)
        const detailsUrl = mediaType === 'tv' 
          ? `https://api.themoviedb.org/3/tv/${movie.id}?api_key=${apiKey}&language=en-US`
          : `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`;
        
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();
        setMovieDetails(detailsData);

        // Fetch credits/cast
        const creditsUrl = mediaType === 'tv'
          ? `https://api.themoviedb.org/3/tv/${movie.id}/credits?api_key=${apiKey}&language=en-US`
          : `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}&language=en-US`;
        
        const creditsResponse = await fetch(creditsUrl);
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast?.slice(0, 20) || []);

        // Fetch similar movies
        const similarUrl = mediaType === 'tv'
          ? `https://api.themoviedb.org/3/tv/${movie.id}/similar?api_key=${apiKey}&language=en-US`
          : `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=${apiKey}&language=en-US`;
        
        const similarResponse = await fetch(similarUrl);
        const similarData = await similarResponse.json();
        setSimilarMovies(similarData.results?.slice(0, 20) || []);

      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie, mediaType, apiKey]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  const handleWatchTrailer = () => {
    if (movieDetails?.videos?.results?.length > 0) {
      const trailer = movieDetails.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
        return;
      }
    }
    // Fallback: search for trailer on YouTube
    const query = encodeURIComponent(`${movie?.title || movie?.name} official trailer`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  const handleWatchMovie = () => {
    const query = encodeURIComponent(`${movie?.title || movie?.name} full movie free`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear();
  };

  const getRuntime = () => {
    if (!movieDetails) return 'N/A';
    const runtime = movieDetails.runtime || movieDetails.episode_run_time?.[0];
    if (!runtime) return 'N/A';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  // Carousel scroll functions
  const scrollCarousel = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Get backdrop URL - prefer from details, fallback to movie prop
  const getBackdropUrl = () => {
    if (movieDetails?.backdrop_path) {
      return `${img_500}/${movieDetails.backdrop_path}`;
    }
    if (movie?.backdrop_path) {
      return `${img_500}/${movie.backdrop_path}`;
    }
    return unavailableLandscape;
  };

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>×</button>
        
        {loading ? (
          <div className="modal-loading">Loading...</div>
        ) : (
          <>
            {/* Banner Section */}
            <div className="modal-banner">
              <img 
                src={getBackdropUrl()} 
                alt={movie.title || movie.name} 
                className="modal-backdrop"
                onError={(e) => {
                  e.target.src = unavailableLandscape;
                }}
              />
              <div className="modal-banner-content">
                <div className="modal-poster-wrapper">
                  <img 
                    src={movie.poster_path ? `${img_300}/${movie.poster_path}` : unavailable} 
                    alt={movie.title || movie.name} 
                    className="modal-poster"
                  />
                </div>
                <div className="modal-info">
                  <h1 className="modal-title">{movie.title || movie.name}</h1>
                  <div className="modal-meta">
                    <span className="modal-year">{formatDate(movie.release_date || movie.first_air_date)}</span>
                    <span className="modal-divider">•</span>
                    <span className="modal-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                    <span className="modal-divider">•</span>
                    <span className="modal-runtime">{getRuntime()}</span>
                  </div>
                  <p className="modal-overview">{movie.overview}</p>
                  <div className="modal-actions">
                    <button className="modal-btn primary" onClick={handleWatchTrailer}>
                      <span className="btn-icon">▶</span> Watch Trailer
                    </button>
                    <button className="modal-btn secondary" onClick={handleWatchMovie}>
                      <span className="btn-icon">🎬</span> Watch Movie
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="modal-details">
              {/* Genres */}
              {movieDetails?.genres?.length > 0 && (
                <div className="modal-section">
                  <h3 className="section-title">Genres</h3>
                  <div className="modal-genres">
                    {movieDetails.genres.map(genre => (
                      <span key={genre.id} className="modal-genre-tag">{genre.name}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Cast with carousel navigation */}
              {cast.length > 0 && (
                <div className="modal-section">
                  <h3 className="section-title">Cast</h3>
                  <div className="carousel-nav cast-nav-left">
                    <button 
                      className="carousel-btn" 
                      onClick={() => scrollCarousel('left', castScrollRef)}
                      aria-label="Scroll cast left"
                    >
                      ‹
                    </button>
                  </div>
                  <div className="modal-cast" ref={castScrollRef}>
                    {cast.map(actor => (
                      <div key={actor.id} className="cast-card">
                        <img 
                          src={actor.profile_path ? `${img_300}/${actor.profile_path}` : unavailable} 
                          alt={actor.name} 
                          className="cast-image"
                        />
                        <span className="cast-name">{actor.name}</span>
                        <span className="cast-character">{actor.character}</span>
                      </div>
                    ))}
                  </div>
                  <div className="carousel-nav cast-nav-right">
                    <button 
                      className="carousel-btn" 
                      onClick={() => scrollCarousel('right', castScrollRef)}
                      aria-label="Scroll cast right"
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="modal-section">
                <h3 className="section-title">Details</h3>
                <div className="modal-info-grid">
                  {movieDetails?.status && (
                    <div className="info-item">
                      <span className="info-label">Status</span>
                      <span className="info-value">{movieDetails.status}</span>
                    </div>
                  )}
                  {movieDetails?.original_language && (
                    <div className="info-item">
                      <span className="info-label">Language</span>
                      <span className="info-value">{movieDetails.original_language.toUpperCase()}</span>
                    </div>
                  )}
                  {movieDetails?.budget > 0 && (
                    <div className="info-item">
                      <span className="info-label">Budget</span>
                      <span className="info-value">${movieDetails.budget.toLocaleString()}</span>
                    </div>
                  )}
                  {movieDetails?.revenue > 0 && (
                    <div className="info-item">
                      <span className="info-label">Revenue</span>
                      <span className="info-value">${movieDetails.revenue.toLocaleString()}</span>
                    </div>
                  )}
                  {movieDetails?.tagline && (
                    <div className="info-item full-width">
                      <span className="info-label">Tagline</span>
                      <span className="info-value tagline">"{movieDetails.tagline}"</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Similar Movies with carousel navigation */}
              {similarMovies.length > 0 && (
                <div className="modal-section">
                  <h3 className="section-title">Related Movies</h3>
                  <div className="carousel-nav similar-nav-left">
                    <button 
                      className="carousel-btn" 
                      onClick={() => scrollCarousel('left', similarScrollRef)}
                      aria-label="Scroll related movies left"
                    >
                      ‹
                    </button>
                  </div>
                  <div className="modal-similar" ref={similarScrollRef}>
                    {similarMovies.map(similar => (
                      <div key={similar.id} className="similar-card">
                        <img 
                          src={similar.poster_path ? `${img_300}/${similar.poster_path}` : unavailable} 
                          alt={similar.title || similar.name} 
                          className="similar-image"
                        />
                        <span className="similar-title">{similar.title || similar.name}</span>
                        <span className="similar-year">{formatDate(similar.release_date)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="carousel-nav similar-nav-right">
                    <button 
                      className="carousel-btn" 
                      onClick={() => scrollCarousel('right', similarScrollRef)}
                      aria-label="Scroll related movies right"
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;