import { useState } from "react";
import noStar from "./img/no-star.png";
import star from "./img/favorit-star.png";
import { imgUrl } from "./option";
import useCookie from "react-use-cookie";

export default function MovieContent({ element, i }) {
  const [favorit, setFavorit] = useState(noStar);
  const [titleCookie, setTitleCookie] = useCookie("title");
  const [posterCookie, setPosterCookie] = useCookie("poster");
  const [favoritCookie, setFavoritCookie] = useCookie("favorit");

  const check = () => {
    if (favorit === noStar) {
      setFavorit(star);
      setTitleCookie(element.title);
      setPosterCookie(element.poster_path);
      setFavoritCookie(favorit);
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
