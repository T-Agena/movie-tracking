import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchMovie() {
  const [movies, setMovies] = useState([]);
  const [text, setText] = useState("");
  const [params, setParams] = useState({});

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
    console.log(getResult.data);
  };

  const onClickSearch = () => {
    setParams({
      query: text,
      include_adult: "false",
      language: "ja-JP",
      page: "1",
    });
  };

  useEffect(() => {
    searchResults();
  }, [params]);

  return (
    <div>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
      ></input>
      <button onClick={onClickSearch}>Search</button>
    </div>
  );
}
