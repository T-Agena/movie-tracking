import { useState } from "react";
import noStar from "./img/no-star.png";
import star from "./img/favorit-star.png";
import { imgUrl } from "./option";

export default function MovieContent({ element }) {
  const [favorit, setFavorit] = useState(noStar);

  const check = () => {
    if (favorit === noStar) {
      setFavorit(star);
    } else {
      setFavorit(noStar);
    }
  };
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
}
