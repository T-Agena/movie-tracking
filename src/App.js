import "./App.css";
import ResponsiveAppBar from "./Header";
import { useState } from "react";
import { useKey } from "react-use";
import Popular from "./PopularMovie";
import Favorites from "./MyFavorites";
import SearchMovie from "./SearchMovie";
import useLocalStorage from "use-local-storage";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
function App() {
  const [sContents, setSContents] = useState(true);
  const [text, setText] = useState("");
  const [params, setParams] = useState({});
  const [movies, setMovies] = useState([]);
  const [searchOn, setSearchOn] = useState(false);
  const [rawMovieLocalStorage, setMovieLocalStorage] = useLocalStorage(
    "data",
    "[]"
  );
  const movieLocalStorage = JSON.parse(rawMovieLocalStorage);

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
  useKey((e) => e.key === "Enter", onClickSearch);

  return (
    <div className="App">
      <ResponsiveAppBar />
      <header className="App-header">
        <h1 onClick={() => window.location.reload()}>Movie</h1>
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
            {searchOn === true ? (
              <SearchMovie
                params={params}
                movies={movies}
                setMovies={setMovies}
                movieLocalStorage={movieLocalStorage}
                setMovieLocalStorage={setMovieLocalStorage}
              />
            ) : (
              <Popular
                movies={movies}
                setMovies={setMovies}
                movieLocalStorage={movieLocalStorage}
                setMovieLocalStorage={setMovieLocalStorage}
              />
            )}
          </div>
        ) : (
          <Favorites
            movieLocalStorage={movieLocalStorage}
            setMovieLocalStorage={setMovieLocalStorage}
          />
        )}
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
