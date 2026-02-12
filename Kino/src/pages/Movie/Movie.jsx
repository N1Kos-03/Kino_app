import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Movie.module.css';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import { useDispatch } from 'react-redux';



export async function movieLoader({ params }) {
  try {
    const res = await fetch(`https://search.imdbot.workers.dev/?tt=${params.id}`);
    const data = await res.json();
    return data.short || null;
  } catch (e) {
    console.error("Ошибка при загрузке фильма", e);
    return null;
  }
}

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://search.imdbot.workers.dev/?tt=${id}`)
      .then(res => res.json())
      .then(data => setMovie(data.short));
  }, [id]);

  if (!movie) return <p>Фильм не найден</p>;

 
  let russianTitle = "";
  if (movie.otherTitles) {
    russianTitle = movie.otherTitles.find((t) => /[а-яё]/i.test(t));
  }

  const movieForCard = {
  id,
  title: movie.name,
  poster: movie.image,
  rating: movie.aggregateRating?.ratingValue || null
};

  const formatDuration = (iso) => {
  if (!iso) return '—';

  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;

  const hours = match[1];
  const minutes = match[2];

  let result = '';
  if (hours) result += `${hours} h `;
  if (minutes) result += `${minutes} min`;

  return result.trim();
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';

  return new Date(dateStr).toLocaleDateString('en-EN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const formatDirectors = (directors) => {
  if (!directors || !directors.length) return '—';
  return directors.map(d => d.name).join(', ');
};

const reviews = movie.review
  ? Array.isArray(movie.review)
    ? movie.review
    : [movie.review]
  : [];

  return (
    <div>
      <div className={styles['header']}>
        <h2>{movie.name}</h2>
        {russianTitle && <h2>{russianTitle}</h2>}
      </div>
      <div className={styles['body']}>
        {movie.image && <img src={movie.image} alt={movie.name} className={styles['poster']}/>}
        <div className={styles['description']}>
          <p>{movie.description}</p>
          <div className={styles['ratings']}>
            <div className={styles['rating']}>
              <img src="/rating.svg" alt="Рейтинг" />
              <p className={styles['rating-number']}>
                {movie.aggregateRating?.ratingValue || '—'}
              </p>
            </div>
            <FavoriteButton movie={movieForCard} />
          </div>
            <div className={styles['info']}>
              <p>Тип</p> 
              <span>{movie['@type'] || '—'}</span>
            </div>
            <div className={styles['info']}>
              <p>Дата выхода</p> 
              <span>{formatDate(movie.datePublished)}</span>
            </div>
            <div className={styles['info']}>
              <p>Длительность</p> 
              <span>{formatDuration(movie.duration)}</span>
            </div>
            <div className={styles['info']}>
              <p>Жанр</p> 
              <span>{movie.genre?.join(', ')}</span>
            </div>
            <div className={styles['info']}>
              <p>Режиссёр</p> 
              <span>{formatDirectors(movie.director)}</span>
            </div>
        </div>
      </div>
      <div className={styles.reviewSection}>
        <h3 className={styles.reviewTitle}>Отзывы</h3>
          {reviews.length ? (
            <div className={styles.reviewList}>
              {reviews.map((rev, i) => (
                <div key={i} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <p className={styles.reviewName}>
                      {rev.name || rev.author?.name || 'User review'}
                    </p>
                    <span className={styles.reviewDate}>
                      {formatDate(rev.dateCreated)}
                    </span>
                  </div>
                  <p className={styles.reviewBody}>
                    {rev.reviewBody}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Отзывов нет</p>
          )}
    </div>
    </div>
  );
}

export default Movie;