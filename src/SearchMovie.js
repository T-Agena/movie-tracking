import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import MovieContent from "./MovieContent";
import noData from "./img/no_data.svg";
import searching from "./img/searching.svg";

export default function SearchMovie({
  params,
  movies,
  setMovies,
  searchOn,
  movieLocalStorage,
  setMovieLocalStorage,
}) {
  const searchResults = async () => {
    const getResult = await axios.request({
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjIyNzRiMzJjMTgwM2ZmNWJmMGFkYjg2ZmNiZmQ4ZCIsInN1YiI6IjY0NmRjYjc0OTY2MWZjMDExZDk1NzlhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6abkUx93_XOwAaIbBxBseBK-1KBWYpoBLMKoIdQ7U9I",
      },
    });
    if (getResult.data) {
      setMovies(getResult.data.results);
      console.log(getResult.data.results);
    }
  };

  useEffect(() => {
    searchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className="search-favoriteContents">
      {!searchOn ? (
        <div className="emptyStateContents">
          <img className="startSearching" src={searching} alt="検索"></img>
          <p>映画のタイトルで検索してみよう</p>
        </div>
      ) : movies.length > 0 ? (
        movies.map((element, i) => (
          <MovieContent
            key={i}
            element={element}
            movieLocalStorage={movieLocalStorage}
            setMovieLocalStorage={setMovieLocalStorage}
          />
        ))
      ) : (
        <div className="emptyStateContents">
          <img className="noData" src={noData} alt="noMovie" />
          <p>お探しの映画は見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}
