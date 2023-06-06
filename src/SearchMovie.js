import axios from "axios";
import { useEffect } from "react";
import MovieContent from "./MovieContent";

export default function SearchMovie({
  params,
  movies,
  cookieData,
  setCookieData,
  movieCookie,
  setMovieCookie,
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
      setMovieCookie(getResult.data.results);
      console.log(getResult.data);
    }
  };

  useEffect(() => {
    searchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div>
      <div className="MainContents">
        {movies.map((element, i) => (
          <MovieContent
            key={i}
            element={element}
            cookieData={cookieData}
            setCookieData={setCookieData}
            movieCookie={movieCookie}
            setMovieCookie={setMovieCookie}
          />
        ))}
      </div>
    </div>
  );
}
