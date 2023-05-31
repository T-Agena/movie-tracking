import { useState } from "react";
import "./App.css";
import axios from "axios";
function Search() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [overview, setOverview] = useState("");
  const [imgUrl, setImgUrl] = useState("https://image.tmdb.org/t/p/w154");

  const popular = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjIyNzRiMzJjMTgwM2ZmNWJmMGFkYjg2ZmNiZmQ4ZCIsInN1YiI6IjY0NmRjYjc0OTY2MWZjMDExZDk1NzlhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6abkUx93_XOwAaIbBxBseBK-1KBWYpoBLMKoIdQ7U9I",
      },
    };

    const response = await axios.request(options);

    console.log(response.data);

    setTitle(response.data.results[0].title);
    setPoster(imgUrl + response.data.results[0].poster_path);
    setOverview(response.data.results[0].overview);
  };
  popular();

  return (
    <div>
      <div className="bararea">
        <input type="text" className="searchBar" />
      </div>
      <div className="MainContents">
        <div>
          <img src={poster} />
          {title}
          {overview}
        </div>
      </div>
    </div>
  );
}
export default Search;
