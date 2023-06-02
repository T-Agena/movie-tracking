import React, { useEffect, useState } from "react";
import "./App.css";
import { imgUrl } from "./option";
import axios from "axios";
import noStar from "./img/no-star.png";
import star from "./img/favorit-star.png";

function Popular({ movies, setMovies }) {
  const [favorit, setFavorit] = useState(noStar);
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

  const check = () => {
    if (favorit === noStar) {
      setFavorit(star);
    } else {
      setFavorit(noStar);
    }
  };

  return (
    <div>
      <div className="MainContents">
        {movies.map((element, i) => (
          <div key={i} className="container">
            <img src={imgUrl + element.poster_path} alt={element.title}></img>
            <div className="detail">
              <h3 className="movieTitle">{element.title}</h3>
              <img
                className="favoritStar"
                src={favorit}
                alt="notFavorit"
                onClick={check}
                key={i}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
