import axios from 'axios';

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
  }
});

export const getPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/movie/popular?language=en-US&page=${page}`);
  return response.data;
};

export const getMovieVideos = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/videos?language=en-US`);
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}?language=en-US`);
  return response.data;
};

export default tmdbApi;
