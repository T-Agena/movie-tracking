import "./App.css";
import MovieContent from "./MovieContent";
import movieNight from "./img/movie_night.svg";

function Favorites({ movieLocalStorage, setMovieLocalStorage }) {
  return (
    <div className="movieContents">
      {movieLocalStorage.length > 0 ? (
        movieLocalStorage.map((element, i) => (
          <MovieContent
            key={i}
            element={element}
            movieLocalStorage={movieLocalStorage}
            setMovieLocalStorage={setMovieLocalStorage}
          />
        ))
      ) : (
        <div className="emptyStateContents">
          <img
            className="notFavorite "
            src={movieNight}
            alt="お気に入りの映画がありません"
          />
          <p>お気に入りの映画を登録しよう</p>
        </div>
      )}
    </div>
  );
}
export default Favorites;
