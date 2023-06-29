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
    try {
      const getResult = await axios.request({
        method: "GET",
        url: process.env.REACT_APP_API_URL + "search?query=" + params,
      });
      console.log(getResult);
      if (getResult.data) {
        setMovies(getResult.data.results);
        console.log(getResult.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params !== "") {
      searchResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className="movieContents">
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
