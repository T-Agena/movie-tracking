import noStar from "./img/no-star.png";
import star from "./img/favorit-star.png";
import { imgUrl } from "./option";
import { useEffect } from "react";

export default function MovieContent({
  element,
  i,
  movieCookie,
  setMovieCookie,
}) {
  var data = [];
  let favorit = noStar;

  if (movieCookie !== "") {
    const getFavorit = JSON.parse(movieCookie).filter(
      (e) => e.id === element.id
    );
    if (getFavorit.length > 0) {
      favorit = star;
    }
  }

  const check = () => {
    if (favorit === noStar) {
      if (movieCookie !== "") {
        data = JSON.parse(movieCookie);
      }
      data.push(element);
    } else {
      data = JSON.parse(movieCookie).filter((e) => e.id !== element.id);
    }
    const jsonTitle = JSON.stringify(data);
    setMovieCookie(jsonTitle);
  };
  useEffect(() => {});

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
