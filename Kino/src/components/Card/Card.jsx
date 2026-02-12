import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { normalizeMovie } from '../../helpers/normalizeMovie';
import { useEffect, useState } from 'react';

function Card({ movies, isSearchPerformed }) {

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
    return null;
  }

  return (
    <div className={styles['card-list']}>
      {listToRender.map((film, index) => {
        console.log('RAW film', film);
  const movie = normalizeMovie(film);
  const [rating, setRating] = useState(null);

useEffect(() => {
  if (!movie.id) return;

  fetch(`https://search.imdbot.workers.dev/?tt=${movie.id}`)
    .then(res => res.json())
    .then(data => {
      setRating(data.short?.aggregateRating?.ratingValue || null);
    })
    .catch(() => setRating(null));
}, [movie.id]);


  return (
    <div key={index} className={styles['card-body']}>
      <div className={styles['rating']}>
        <img src="/rating.svg" alt="Рейтинг" />
        <p className={styles['rating-number']}>
  {rating ?? '—'}
</p>
      </div>

      <Link to={`/movie/${movie.id}`}>
        <img src={movie.poster} alt={movie.title} className={styles['poster-img']} />
      </Link>

      <h3>{movie.title}</h3>
      <FavoriteButton movie={movie} />
    </div>
  );
})}

    </div>
  );
}

export default Card;
