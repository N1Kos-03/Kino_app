import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Loader функция для загрузки данных фильма
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

  useEffect(() => {
    fetch(`https://search.imdbot.workers.dev/?tt=${id}`)
      .then(res => res.json())
      .then(data => setMovie(data.short));
  }, [id]);

  if (!movie) return <p>Фильм не найден</p>;

  // Ищем русский перевод среди других названий
  let russianTitle = "";
  if (movie.otherTitles) {
    russianTitle = movie.otherTitles.find((t) => /[а-яё]/i.test(t));
  }

  return (
    <div>
      <h1>{movie.name}</h1>
      {russianTitle && <h2>{russianTitle}</h2>}
      {movie.image && <img src={movie.image} alt={movie.name} />}
      <p>{movie.description}</p>
      <p>Год: {movie.datePublished}</p>
      <p>Оценка: {movie.aggregateRating?.ratingValue}</p>
    </div>
  );
}

export default Movie;