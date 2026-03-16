import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieVideos } from '../services/api';

function PageP() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch details and videos in parallel
        const [detailsData, videosData] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id)
        ]);
        
        setMovie(detailsData);
        
        // Find YouTube trailer
        if (videosData && videosData.results) {
          const trailer = videosData.results.find(
            (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
          );
          if (trailer) {
            setVideoKey(trailer.key);
          }
        }
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#060D17]">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#060D17] text-white">
        <p className="text-xl mb-4 text-red-500">{error || 'Movie not found'}</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-3 bg-gray-700 font-semibold rounded-lg hover:bg-gray-600 transition"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-6 text-white min-h-screen bg-[#060D17] overflow-x-hidden'>
      {videoKey && isPlaying ? (
        <div className='relative w-full h-screen'>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title={movie.original_title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className='absolute top-0 left-0 w-full h-full object-cover'
          ></iframe>
          <button 
            onClick={() => setIsPlaying(false)} 
            className='absolute top-6 left-6 z-10 px-6 py-2 bg-black bg-opacity-70 text-white rounded hover:bg-opacity-100 transition'
          >
             Close Player
          </button>
        </div>
      ) : (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
          {/* Background Image with Overlay */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter brightness-25 blur-sm"
            style={{ 
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})` 
            }}
          ></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 max-w-6xl py-20 w-full">
            <button 
              onClick={() => navigate('/')} 
              className='absolute top-6 left-6 px-6 py-2 bg-gray-800 bg-opacity-70 text-white rounded-lg hover:bg-gray-700 transition'
            >
              ← Back
            </button>
           
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              className='rounded-xl shadow-2xl w-[300px] md:w-[400px] flex-shrink-0 border border-gray-800'
            />
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{movie.original_title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base text-gray-300 font-semibold drop-shadow">
                 <span className="bg-gray-800 px-3 py-1 rounded">{movie.release_date?.substring(0,4)}</span>
                 <span className="flex items-center gap-1 bg-yellow-600 px-3 py-1 rounded text-white">
                   ★ {movie.vote_average?.toFixed(1)}
                 </span>
                 {movie.runtime > 0 && <span>{movie.runtime} min</span>}
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-gray-200">Overview</h3>
              <p className="max-w-2xl text-lg text-gray-300 drop-shadow-md mb-8 leading-relaxed">
                {movie.overview || 'No synopsis available.'}
              </p>
              
              {videoKey && (
                <button 
                  className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 hover:scale-105 transition duration-300 shadow-[0_0_15px_rgba(220,38,38,0.5)] flex items-center gap-3"
                  onClick={() => setIsPlaying(true)}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                  Watch Trailer
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PageP;