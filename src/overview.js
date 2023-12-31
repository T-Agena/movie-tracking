import axios from "axios";
import { imgUrl } from "./option";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CircularIndeterminate from "./Loading";
export default function OverView({ movieId, setMovieId, loading, setLoading }) {
  const [viewData, setViewData] = useState({});
  const [backImgUrl, setBackImgUrl] = useState();

  const style = {
    backgroundImage: `url(${backImgUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const getOverview = async () => {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const closeDetaile = () => {
    setMovieId(0);
  };
  useEffect(() => {
    getOverview();
  }, []);

  if (loading) {
    return (
      <div className="movieContents2">
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <div className="detaileHome">
      <div className="movieDitaileContent">
        <div className="headerImg" style={style}>
          <div className="viewArea">
            <div className="introduction">
              <div className="overviewPosterContainer">
                <img
                  src={imgUrl + viewData.poster_path}
                  alt={viewData.title}
                  className="overviewPoster"
                />
              </div>

              <div className="information">
                <div className="closeButton">
                  <ClearIcon
                    fontSize="large"
                    onClick={() => {
                      closeDetaile();
                    }}
                    className="closeIcon"
                  />
                </div>
                <div className="titleBar">
                  <h1 className="overviewTitle">{viewData.title}</h1>
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
    </div>
  );
}
