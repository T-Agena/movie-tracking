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
  const [favorit, setFavorit] = useState(noStar);
  const check = () => {
    if (favorit === noStar) {
      const json = JSON.parse(movieCookie || null);
      const addCookie = [[json], [element]];
      setFavorit(star);

      const jsonTitle = JSON.stringify(addCookie);
      setMovieCookie(jsonTitle);
    } else {
      setFavorit(noStar);
    }
  };
  if (element.poster_path !== null) {
    return (
      <div className="container">
        <img src={imgUrl + element.poster_path} alt={element.title}></img>
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
  } else {
    return (
      <div key={i} className="container">
        <div>no-image</div>
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
}
