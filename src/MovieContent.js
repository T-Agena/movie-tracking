import noStar from "./img/no-star.png";
import star from "./img/favorit-star.png";
import { imgUrl } from "./option";
import { useEffect } from "react";

export default function MovieContent({ element, movieCookie, setMovieCookie }) {
  const favorite =
    movieCookie.filter((e) => e.id === element.id).length > 0 ? star : noStar;

  const handleCheck = () => {
    let data = [];
    if (favorite === noStar) {
      data = [...movieCookie, element];
    } else {
      data = movieCookie.filter((e) => e.id !== element.id);
    }
    setMovieCookie(JSON.stringify(data));
  };
  useEffect(() => {});

  console.log(movieCookie);

  return (
    <div className="container">
      {element.poster_path && (
        <img src={imgUrl + element.poster_path} alt={element.title}></img>
      )}
      <div className="detail">
        <h3 className="movieTitle">{element.title}</h3>
        <img
          className="favoritStar"
          src={favorite}
          alt="notFavorit"
          onClick={handleCheck}
        />
      </div>
    </div>
  );
}
