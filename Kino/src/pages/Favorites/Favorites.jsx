import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";


function Favorites() {
  const movies = useSelector(state => state.favorites.items);

  if (!movies.length) {
    return (
      <div>
        <h1>Избранное</h1>
        <p>Здесь будет список избранных фильмов</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Избранное</h1>

      <Card movies={movies} isSearchPerformed={true} />
    </div>
  );
}

export default Favorites;
