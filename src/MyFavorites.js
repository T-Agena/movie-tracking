import "./App.css";
import MovieContent from "./MovieContent";

function Favorites({ movieCookie, setMovieCookie }) {
  return (
    <div>
      <div className="MainContents">
        {JSON.parse(movieCookie).map((element, i) => (
          <MovieContent
            key={i}
            element={element}
            movieCookie={movieCookie}
            setMovieCookie={setMovieCookie}
          />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
