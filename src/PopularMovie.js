import React, { useEffect, useState } from "react";
import "./App.css";
import { imgUrl } from "./option";
import axios from "axios";

function Popular() {
  const [movies, setMovies] = useState([]);

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
  }, []);

  return (
    <div>
      <div className="bararea">
        <input type="text" className="searchBar" />
      </div>
      <div className="MainContents">
        {movies.map((element, i) => (
          <div key={i} className="container">
            <img src={imgUrl + element.poster_path}></img>
            <div className="detail">
              <h3 className="movieTitle">{element.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
