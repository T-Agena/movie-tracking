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
  const [contents, setContents] = useState(true);
  const [text, setText] = useState("");
  const [params, setParams] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchOn, setSearchOn] = useState(false);
  const [rawMovieLocalStorage, setMovieLocalStorage] = useLocalStorage(
    "data",
    "[]"
  );

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
              movies={movies}
              setMovies={setMovies}
              searchOn={searchOn}
              movieLocalStorage={movieLocalStorage}
              setMovieLocalStorage={setMovieLocalStorage}
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
      <ResponsiveAppBar contents={contents} setContents={setContents} />
      <div className="home">{selectMenu()}</div>
      <footer>
        <span id="copyright">&copy;2023 T-Agena</span>
      </footer>
    </div>
  );
}

export default App;
