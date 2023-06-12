import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import MovieContent from "./MovieContent";

function Popular({
  movies,
  setMovies,
  movieLocalStorage,
  setMovieLocalStorage,
}) {
  const getPopular = async () => {
    const response = await axios.request({
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      params: { language: "ja-JP", page: "1" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjIyNzRiMzJjMTgwM2ZmNWJmMGFkYjg2ZmNiZmQ4ZCIsInN1YiI6IjY0NmRjYjc0OTY2MWZjMDExZDk1NzlhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6abkUx93_XOwAaIbBxBseBK-1KBWYpoBLMKoIdQ7U9I",
      },
    });

    if (response.data) {
      setMovies(response.data.results);
      console.log(response.data.results);
    }
  };

  useEffect(() => {
    getPopular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="MainContents">
      {movies.map((element, i) => (
        <MovieContent
          key={i}
          element={element}
          movieLocalStorage={movieLocalStorage}
          setMovieLocalStorage={setMovieLocalStorage}
        />
      ))}
    </div>
  );
}

export default Popular;
