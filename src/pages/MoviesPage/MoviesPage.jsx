import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchMovieByName } from '../../service/movieAPI';

import SearchForm from '../../components/SearchForm/SearchForm';

import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query');

  useEffect(() => {
    if (!movieName) return;
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const requestData = await searchMovieByName(movieName);
        console.log(requestData.results);
        setMovies(requestData.results);
      } catch {
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [movieName]);
  const onSubmit = query => {
    setSearchParams({ query });
  };

  return (
    <div>
      <SearchForm onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
