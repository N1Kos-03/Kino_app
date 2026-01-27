export function normalizeMovie(film) {
  return {
    id: film.id || film['#IMDB_ID'] || film.number,
    title: film.title || film['#TITLE'],
    poster: film.poster || film['#IMG_POSTER'],
    rank: film.rank || film['#RANK']
  };
}

