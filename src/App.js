import "./App.css";
import { useState } from "react";
import Popular from "./PopularMovie";
import Favorites from "./MyFavorites";
import SearchMovie from "./SearchMovie";

function App() {
  const [sContents, setSContents] = useState(true);

  const chengeMenu = (menu) => {
    if (menu) {
      setSContents(menu);
    } else {
      setSContents(menu);
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
      <div>{sContents === true ? <SearchMovie /> : <Favorites />}</div>
    </div>
  );
}

export default App;
