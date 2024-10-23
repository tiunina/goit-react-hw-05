// import css from './HomePage.module.css';

import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../service/movieAPI';

import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const requestData = await getTrendingMovies();
        setMovies(requestData.results);
      } catch {
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
