import { useState } from "react";
import noStar from "./img/no-star.png";
import star from "./img/favorit-star.png";
import { imgUrl } from "./option";

export default function MovieContent({
  element,
  i,
  movieCookie,
  setMovieCookie,
}) {
  var data = [];
  const [favorit, setFavorit] = useState(noStar);
  const check = () => {
    if (favorit === noStar) {
      setFavorit(star);
    } else {
      setFavorit(noStar);
    }
    const jsonTitle = JSON.stringify();
    setMovieCookie(jsonTitle);
  };
  return (
    <div className="container">
      {element.poster_path && (
        <img src={imgUrl + element.poster_path} alt={element.title}></img>
      )}
      <div className="detail">
        <h3 className="movieTitle">{element.title}</h3>
        <img
          className="favoritStar"
          src={favorit}
          alt="notFavorit"
          onClick={check}
        />
      </div>
    </div>
  );
}
