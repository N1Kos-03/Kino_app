export const normalizeMovie = (film) => ({
  id: film['#IMDB_ID'] || film.id,
  title: film['#TITLE'] || film.title,
  poster: film['#IMG_POSTER'] || film.poster,

  rating:
    film.aggregateRating?.ratingValue ??
    film.rating ??
    null
});
