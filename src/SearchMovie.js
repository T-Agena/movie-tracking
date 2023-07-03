import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import MovieContent from "./MovieContent";
import noData from "./img/no_data.svg";
import searching from "./img/searching.svg";
import CircularIndeterminate from "./Loading";

export default function SearchMovie({
  params,
  searchMovies,
  setSearchMovies,
  searchOn,
  movieLocalStorage,
  setMovieLocalStorage,
}) {
  const [loading, setLoading] = useState(false);

  const searchResults = async () => {
    setLoading(true);
    try {
      const getResult = await axios.request({
        method: "GET",
        url: process.env.REACT_APP_API_URL + "/search?query=" + params,
      });
      if (getResult.data) {
        setSearchMovies(getResult.data.results);
        setLoading(false);
        console.log(getResult.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params !== "") {
      searchResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  if (loading) {
    return (
      <div className="movieContents2">
        <div className="emptyStateContents">
          <CircularIndeterminate />
        </div>
      </div>
    );
  }

  return (
    <div>
      {!searchOn ? (
        <div className="movieContents2">
          <div className="emptyStateContents">
            <img className="startSearching" src={searching} alt="検索"></img>
            <p>映画のタイトルで検索してみよう</p>
          </div>
        </div>
      ) : searchMovies.length > 0 ? (
        <div className="movieContents">
          {searchMovies.map((element, i) => (
            <MovieContent
              key={i}
              element={element}
              movieLocalStorage={movieLocalStorage}
              setMovieLocalStorage={setMovieLocalStorage}
            />
          ))}
        </div>
      ) : (
        <div className="movieContents2">
          <div className="emptyStateContents">
            <img className="noData" src={noData} alt="noMovie" />
            <p>お探しの映画は見つかりませんでした。</p>
          </div>
        </div>
      )}
    </div>
  );
}

// return (
//   <div className="movieContents">
//     {!searchOn ? (
//       <div className="emptyStateContents">
//         <img className="startSearching" src={searching} alt="検索"></img>
//         <p>映画のタイトルで検索してみよう</p>
//       </div>
//     ) : searchMovies.length > 0 ? (
//       searchMovies.map((element, i) => (
//         <MovieContent
//           key={i}
//           element={element}
//           movieLocalStorage={movieLocalStorage}
//           setMovieLocalStorage={setMovieLocalStorage}
//         />
//       ))
//     ) : (
//       <div className="emptyStateContents">
//         <img className="noData" src={noData} alt="noMovie" />
//         <p>お探しの映画は見つかりませんでした。</p>
//       </div>
//     )}
//   </div>
// );
