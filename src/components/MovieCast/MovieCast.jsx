import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../service/movieAPI';
import Loader from '../Loader/Loader';

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  const defaultImg = 'https://www.movienewz.com/img/films/poster-holder.jpg';

  useEffect(() => {
    if (!movieId) return;
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const requestData = await fetchMovieCredits(movieId);
        setCast(requestData.cast);
      } catch {
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [movieId]);

  return (
    <div>
      {' '}
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {cast.length > 0 ? (
        <ul>
          {cast.map(item => (
            <li
              key={item.cast_id}
              style={{ listStyleType: 'none', marginBottom: '15px' }}
            >
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${item.profile_path}`
                    : defaultImg
                }
                alt={item.name}
                width={100}
                height={150}
                style={{ borderRadius: '10px', marginRight: '10px' }}
              />
              <div>
                <strong>{item.name}</strong> as {item.character}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available</p>
      )}
    </div>
  );
};

export default MovieCast;
