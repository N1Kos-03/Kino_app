import styles from './FavoriteButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, saveFavorites } from '../../store/favorites.slice';

function FavoriteButton({ movie }) {
  if (!movie) return null; 

  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.userName);
  const favorites = useSelector(state => state.favorites.items);

  const movieId = movie.imdbId || movie.id;

  const isFavorite = favorites.some(f => f.id === movieId);

  const toggle = () => {
  const normalizedMovie = {
    id: movie.imdbId || movie.id,
    title: movie.name || movie.title,
    poster: movie.image || movie.poster,
    rating: movie.aggregateRating?.ratingValue || movie.rating || null
  };

  dispatch(toggleFavorite(normalizedMovie));
  dispatch(saveFavorites(userName));
};


  return (
    <div className={styles['like']} onClick={toggle}>
      <img
        src={isFavorite ? "/bookmark.svg" : "/like.svg"}
        alt="Избранное"
      />
      <div
        className={`${styles['like-text']} ${
          isFavorite ? styles['like-saved'] : styles['like-add']
        }`}
      >
        {isFavorite ? "В избранном" : "В избранное"}
      </div>
    </div>
  );
}

export default FavoriteButton;
