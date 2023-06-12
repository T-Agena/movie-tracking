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
  const [params, setParams] = useState({});
  const [movies, setMovies] = useState([]);
  const [searchOn, setSearchOn] = useState(false);
  const [rawMovieLocalStorage, setMovieLocalStorage] = useLocalStorage(
    "data",
    "[]"
  );
  const movieLocalStorage = JSON.parse(rawMovieLocalStorage);
  const selectMenu = () => {
    switch (contents) {
      case "Popular":
        return (
          <Popular
            movies={movies}
            setMovies={setMovies}
            movieLocalStorage={movieLocalStorage}
            setMovieLocalStorage={setMovieLocalStorage}
          />
        );
      case "Search":
        return (
          <>
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
              movieLocalStorage={movieLocalStorage}
              setMovieLocalStorage={setMovieLocalStorage}
            />
          </>
        );
      case "Favorite":
        return (
          <Favorites
            movieLocalStorage={movieLocalStorage}
            setMovieLocalStorage={setMovieLocalStorage}
          />
        );
      default:
        return (
          <Popular
            movies={movies}
            setMovies={setMovies}
            movieLocalStorage={movieLocalStorage}
            setMovieLocalStorage={setMovieLocalStorage}
          />
        );
    }
  };
  const chengeMenu = (menu) => {
    if (menu) {
      setContents(menu);
    } else {
      setContents(menu);
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
      <ResponsiveAppBar contents={contents} setContents={setContents} />
      <div className="home">{selectMenu()}</div>
      <footer></footer>
    </div>
  );
}

export default App;
