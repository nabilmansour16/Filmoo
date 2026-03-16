import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function PageP() {
  const navigate = useNavigate();
  const info = useLocation();
  const [movie, setMovie] = useState(info.state.data);
  const [videoKey, setVideokey] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=VOTRE_CLE&language=en-US`,

          {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWQzMDE0ODk4ODg0NTk0ZmE1YjNiOWM3N2FhYTUxMCIsIm5iZiI6MTc1ODkwMDkxNi45MzI5OTk4LCJzdWIiOiI2OGQ2YjJiNGZkNDlkZDk2YTc2OTc0ZmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.L-Ety4mC9N5s5ecV9bPmFNnSyKroVqOCY8U49n3vQf0',
            },
          }
        );

        const video = res.data.results;
        const trailer = video.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );

        if (trailer) {
          setVideokey(trailer.key);
        }
      } catch (error) {
        console.error('Erreur de récupération de la vidéo :', error);
      }
    };

    if (movie?.id) getVideo();
  }, [movie]);

  return (
    <div className='flex flex-col items-center gap-6 text-white'>
     
      {videoKey ? (
        <div className ='relative w-full h-[500px]'>
        <iframe
          width="800"
          height="450"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title={movie.original_title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; autoplay"
          allowFullScreen
          className='absolute top-0 left-0 w-full h-screen object-cover filter brightness-50'
        ></iframe>
        </div>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
          className='rounded-xl shadow-lg'
        />
      )}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white px-4">
         <button onClick={() => { navigate('/',{state:{data:movie}})}} className='self-start ml-6 mt-[-300px] px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 duration-300'>
        Retour
      </button>
     
    <h1 className="text-4xl font-bold mb-4">{movie.original_title}</h1>
    <p className="max-w-xl text-center">{movie.overview}</p>
     {
      !isPlaying  && (
    <button className="mt-6 px-6 py-3 bg-red-600 rounded-lg hover:bg-red-500 transition"
      onClick={() => setIsPlaying(true)}
    >
      Regarder maintenant
    </button>)
      }
    
  </div>
    </div>
    
  );
}

export default PageP;