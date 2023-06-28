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
    try {
      const response = await axios.request({
        method: "GET",
        url: process.env.REACT_APP_API_URL + "/popular",
      });
      if (response) {
        setMovies(response.data.results);
      }
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("key", process.env.REACT_APP_API_URL + "popular");
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
