import axios from 'axios';
const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODhhNzI2OWMxYWFkMGM2ZWI2NWU5ZTZjOWUzOTNhYSIsIm5iZiI6MTcyOTI4NDA5Ni4yNzEyNTgsInN1YiI6IjY3MTJjNjgxOGU4NDQ2NTdiN2ZiNGRiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-kdaN08CGoRG6TycWjBU7okuN3szxYs5VwPe0Eh0pfc';
const movieInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',

  headers: {
    Authorization: `Bearer ${token}`,
  },
  params: {
    include_adult: false,
    language: 'en-US',
  },
});

export const getTrendingMovies = async (time_window = 'week') => {
  const { data } = await movieInstance.get(`/trending/movie/${time_window}`, {
    params: {
      page: 1,
    },
  });
  return data;
};

export const searchMovieByName = async movieName => {
  const { data } = await movieInstance.get('/search/movie', {
    params: {
      query: movieName,
      page: 1,
    },
  });
  return data;
};

export const fetchMovieDetails = async movie_id => {
  const { data } = await movieInstance.get(`/movie/${movie_id}`);
  return data;
};
export const fetchMovieCredits = async movie_id => {
  const { data } = await movieInstance.get(`/movie/${movie_id}/credits`);
  return data;
};
export const fetchMovieReviews = async movie_id => {
  const { data } = await movieInstance.get(`/movie/${movie_id}/reviews`);
  return data;
};
