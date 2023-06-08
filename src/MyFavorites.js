import "./App.css";
import MovieContent from "./MovieContent";

function Favorites({ movieLocalStorage, setMovieLocalStorage }) {
  return (
    <div>
      <div className="MainContents">
        {movieLocalStorage.map((element, i) => (
          <MovieContent
            key={i}
            element={element}
            movieLocalStorage={movieLocalStorage}
            setMovieLocalStorage={setMovieLocalStorage}
          />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
