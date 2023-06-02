import axios from "axios";
import { imgUrl } from "./option";
import { useEffect } from "react";

export default function SearchMovie({ params, movies, setMovies }) {
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
      console.log(getResult.data);
    }
  };

  useEffect(() => {
    searchResults();
  }, [params]);

  return (
    <div>
      <div>
        <div className="MainContents">
          {movies.map((element, i) => {
            if (element.poster_path !== null) {
              return (
                <div key={i} className="container">
                  <img
                    src={imgUrl + element.poster_path}
                    alt={element.title}
                  ></img>
                  <div className="detail">
                    <h3 className="movieTitle">{element.title}</h3>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={i} className="container">
                  <div>no-image</div>
                  <div className="detail">
                    <h3 className="movieTitle">{element.title}</h3>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
