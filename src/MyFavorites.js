import "./App.css";
import MovieContent from "./MovieContent";
import movieNight from "./img/movie_night.svg";

function Favorites({ movieLocalStorage, setMovieLocalStorage, setMovieId }) {
  return (
    <div>
      {movieLocalStorage.length > 0 ? (
        <div className="movieContents">
          {movieLocalStorage.map((element, i) => (
            <MovieContent
              key={i}
              element={element}
              movieLocalStorage={movieLocalStorage}
              setMovieLocalStorage={setMovieLocalStorage}
              setMovieId={setMovieId}
            />
          ))}
        </div>
      ) : (
        <div className="movieContents2">
          <div className="emptyStateContents">
            <img
              className="notFavorite "
              src={movieNight}
              alt="お気に入りの映画がありません"
            />
            <p>お気に入りの映画を登録しよう</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Favorites;
