import "./App.css";
import OverView from "./overview";
import ResponsiveAppBar from "./Header";
import { useState } from "react";
import { useKey } from "react-use";
import Popular from "./PopularMovie";
import Favorites from "./MyFavorites";
import SearchMovie from "./SearchMovie";
import useLocalStorage from "use-local-storage";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import gitHubLogo from "./img/github-mark-white.png";
import tmdbLogo from "./img/tmDBLogo.svg";
function App() {
  const [contents, setContents] = useState(true);
  const [text, setText] = useState("");
  const [params, setParams] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState({});
  const [searchOn, setSearchOn] = useState(false);
  const [rawMovieLocalStorage, setMovieLocalStorage] = useLocalStorage(
    "data",
    "[]"
  );
  const [loading, setLoading] = useState(false);
  const [movieId, setMovieId] = useState(0);

  const movieLocalStorage = JSON.parse(rawMovieLocalStorage);
  const selectMenu = () => {
    switch (contents) {
      case "検索":
        return (
          <>
            <h1>検索</h1>
            <div id="barArea">
              <TextField
                fullWidth
                // label="fullWidth"
                id="fullWidth"
                value={text}
                onChange={(event) => setText(event.target.value)}
                size="small"
                placeholder="映画のタイトル"
              />
              <Button variant="contained" onClick={onClickSearch}>
                <SearchIcon />
              </Button>
            </div>
            <SearchMovie
              params={params}
              searchMovies={searchMovies}
              setSearchMovies={setSearchMovies}
              searchOn={searchOn}
              movieLocalStorage={movieLocalStorage}
              setMovieLocalStorage={setMovieLocalStorage}
              loading={loading}
              setLoading={setLoading}
              setMovieId={setMovieId}
            />
          </>
        );
      case "お気に入り":
        return (
          <>
            <h1>お気に入り</h1>
            <Favorites
              movieLocalStorage={movieLocalStorage}
              setMovieLocalStorage={setMovieLocalStorage}
              setMovieId={setMovieId}
            />
          </>
        );
      default:
      case "Pick Up":
        return (
          <>
            <h1>PICK UP</h1>
            <Popular
              movies={movies}
              setMovies={setMovies}
              movieLocalStorage={movieLocalStorage}
              setMovieLocalStorage={setMovieLocalStorage}
              setMovieId={setMovieId}
            />
          </>
        );
    }
  };

  const onClickSearch = () => {
    setParams(text);
    if (text) {
      setSearchOn(true);
    } else {
      setSearchOn(false);
    }
  };
  useKey((e) => e.key === "Enter", onClickSearch);

  return (
    <div className="App">
      <div>
        <ResponsiveAppBar
          contents={contents}
          setContents={setContents}
          setMovieId={setMovieId}
        />
        {movieId === 0 ? (
          <div className="home">{selectMenu()}</div>
        ) : (
          <OverView
            movieId={movieId}
            setMovieId={setMovieId}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
      <footer>
        <span id="copyright">&copy;2023 T-Agena</span>
        <div className="lineUpLogos">
          <div className="logoContainer">
            <a href="https://github.com/T-Agena/movie-tracking">
              <img src={gitHubLogo} alt="github" className="githubLogo" />
            </a>
          </div>
          <div className="logoContainer">
            <a href="https://www.themoviedb.org/">
              <img src={tmdbLogo} alt="tmDB" className="tmDBLogo" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
