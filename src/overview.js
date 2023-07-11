import axios from "axios";
import { imgUrl } from "./option";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
export default function OverView({ movieId, setMovieId }) {
  const [viewData, setViewData] = useState({});
  const [backImgUrl, setBackImgUrl] = useState();

  const style = {
    backgroundImage: `url(${backImgUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const getOverview = async () => {
    try {
      const overviewResults = await axios.request({
        method: "GET",
        url: process.env.REACT_APP_API_URL + "/detail?query=" + movieId,
      });
      if (overviewResults.data) {
        console.log(overviewResults.data);
        setViewData(overviewResults.data);
        setBackImgUrl(imgUrl + overviewResults.data.backdrop_path);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeDetaile = () => {
    setMovieId(0);
  };
  useEffect(() => {
    getOverview();
  }, []);

  return (
    <div className="movieDitaileContent">
      <div className="headerImg" style={style}>
        <div className="viewArea">
          {/* <h1 className="mobileTitle">{viewData.title}</h1> */}
          <div className="introduction">
            <div className="overviewPosterContainer">
              <img
                src={imgUrl + viewData.poster_path}
                alt={viewData.title}
                className="overviewPoster"
              />
            </div>

            <div className="information">
              <div className="titleBar">
                <h1 className="overviewTitle">{viewData.title}</h1>
                <div>
                  <ClearIcon
                    fontSize="large"
                    onClick={() => {
                      closeDetaile();
                    }}
                    className="closeButton"
                  />
                </div>
              </div>
              <div className="informationMiddle">
                <div className="releaseDate">
                  <h4 className="detailItem">公開日</h4>
                  <p className="overviewParagraph middleParagraph">
                    {viewData.release_date}
                  </p>
                </div>
                <div className="genres">
                  <h4 className="detailItem">ジャンル</h4>
                  {viewData.genres ? (
                    <div className="nameContainer middleParagraph">
                      {viewData.genres.map((element, i) => (
                        <p key={i} className="genreName overviewParagraph">
                          {element.name}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="informationBottom">
                <h4 className="detailItem">概要</h4>
                <p className="overviewParagraph">{viewData.overview}</p>
              </div>
            </div>
          </div>
          <div className="overviewMobile">
            <h4 className="detailItem">概要</h4>
            <p className="overviewParagraph">{viewData.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
