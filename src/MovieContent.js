import { useState } from "react";
import noStar from "./img/no-star.png";
import star from "./img/favorit-star.png";
import { imgUrl } from "./option";

export default function MovieContent({
  element,
  i,
  cookieData,
  setCookieData,
  movieCookie,
  setMovieCookie,
}) {
  const [favorit, setFavorit] = useState(noStar);
  const check = () => {
    if (favorit === noStar) {
      const dataSet = [...cookieData, element.title];
      setCookieData(dataSet);
      setFavorit(star);
    } else {
      setFavorit(noStar);
    }
    const jsonTitle = JSON.stringify(cookieData);
    setMovieCookie(jsonTitle);
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
