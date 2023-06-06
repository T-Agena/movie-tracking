import "./App.css";
import { useState } from "react";
import Popular from "./PopularMovie";
import Favorites from "./MyFavorites";
import SearchMovie from "./SearchMovie";
import useCookie from "react-use-cookie";

function App() {
  const [sContents, setSContents] = useState(true);
  const [text, setText] = useState("");
  const [params, setParams] = useState({});
  const [movies, setMovies] = useState([]);
  const [searchOn, setSearchOn] = useState(false);
  const [cookieData, setCookieData] = useState([]);
  const [movieCookie, setMovieCookie] = useCookie("data");

  const chengeMenu = (menu) => {
    if (menu) {
      setSContents(menu);
    } else {
      setSContents(menu);
    }
  };

  const onClickSearch = () => {
    setParams({
      query: text,
      include_adult: "false",
      language: "ja-JP",
      page: "1",
    });
    if (text) {
      setSearchOn(true);
    } else {
      setSearchOn(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie</h1>
        <div>
          <p
            className="menu"
            onClick={() => {
              chengeMenu(true);
            }}
          >
            Search Movie
          </p>
          <p
            className="menu"
            onClick={() => {
              chengeMenu(false);
            }}
          >
            My Favorites
          </p>
        </div>
      </header>
      <div>
        {sContents === true ? (
          <div>
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <button onClick={onClickSearch}>Search</button>
            {searchOn === true ? (
              <SearchMovie
                params={params}
                movies={movies}
                setMovies={setMovies}
                cookieData={cookieData}
                setCookieData={setCookieData}
                movieCookie={movieCookie}
                setMovieCookie={setMovieCookie}
              />
            ) : (
              <Popular
                movies={movies}
                setMovies={setMovies}
                cookieData={cookieData}
                setCookieData={setCookieData}
                movieCookie={movieCookie}
                setMovieCookie={setMovieCookie}
              />
            )}
          </div>
        ) : (
          <Favorites />
        )}
      </div>
    </div>
  );
}

export default App;
