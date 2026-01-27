import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, saveFavorites } from '../../store/favorites.slice';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { normalizeMovie } from '../../helpers/normalizeMovie';

function Card({ movies, isSearchPerformed }) {

const dispatch = useDispatch();
const { userName } = useContext(UserContext);
const favorites = useSelector(state => state.favorites.items);

const isFavorite = (film) => {
  const movie = normalizeMovie(film);
  return favorites.some(f => f.id === movie.id);
};

const toggle = (film) => {
  const movie = normalizeMovie(film);
  dispatch(toggleFavorite(movie));
  dispatch(saveFavorites(userName));
};


  const filmList = [
  {
    "#IMDB_ID": "tt3480822",
    "#TITLE": "Black Widow",
    "#IMG_POSTER": "/poster/blackwidow.png",
    "#RANK": "324"
  },
  {
    "#IMDB_ID": "tt9376612",
    "#TITLE": "Shang-Chi",
    "#IMG_POSTER": "/poster/shangchi.png",
    "#RANK": "124"
  },
  {
    "#IMDB_ID": "tt9140554",
    "#TITLE": "Loki",
    "#IMG_POSTER": "/poster/loki.png",
    "#RANK": "235"
  },
  {
    "#IMDB_ID": "tt0460649",
    "#TITLE": "How I Met Your Mother",
    "#IMG_POSTER": "/poster/how.png",
    "#RANK": "123"
  },
  {
    "#IMDB_ID": "tt6468322",
    "#TITLE": "Money Heist",
    "#IMG_POSTER": "/poster/money.png",
    "#RANK": "8125"
  },
  {
    "#IMDB_ID": "tt0108778",
    "#TITLE": "Friends",
    "#IMG_POSTER": "/poster/friends.png",
    "#RANK": "123"
  },
  {
    "#IMDB_ID": "tt0898266",
    "#TITLE": "The Big Bang Theory",
    "#IMG_POSTER": "/poster/big.png",
    "#RANK": "12"
  },
  {
    "#IMDB_ID": "tt0367279",
    "#TITLE": "Two and a Half Men",
    "#IMG_POSTER": "/poster/two.png",
    "#RANK": "456"
  }
];

  const listToRender = isSearchPerformed ? movies : filmList;

  if (isSearchPerformed && (!movies || movies.length === 0)) {
    return ;
  }

  return (
    <div className={styles['card-list']}>
      {listToRender.map((film, index) => (
        <div key={index} className={styles['card-body']}>
          <div className={styles['rating']}>
            <img src="/rating.svg" alt="Рейтинг" />
            <p className={styles['rating-number']}>
              {normalizeMovie(film).rank || '—'}
            </p>
          </div>

          <Link to={film['#IMDB_ID'] ? `/movie/${film['#IMDB_ID']}` : '#'}>
           <img
              src={normalizeMovie(film).poster}
              alt={normalizeMovie(film).title}
              className={styles['poster-img']}
            />
          </Link>

          <h3>{normalizeMovie(film).title}</h3>
          

          <div className={styles['like']}
               onClick={() => toggle(film)}
            >
              <img
                src={isFavorite(film) 
                  ? "/bookmark.svg" 
                  : "/like.svg"
                }
                alt="Избранное"
              />
            <div
              className={`${styles['like-text']} ${
                isFavorite(film)
                  ? styles['like-saved']
                  : styles['like-add']
              }`}
            >
              {isFavorite(film)
                ? "В избранном"
                : "В избранное"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
