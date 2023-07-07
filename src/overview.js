import axios from "axios";
import { imgUrl } from "./option";
import { useEffect, useState } from "react";
export default function OverView() {
  const [viewData, setViewData] = useState({});
  const [pictureData, setPictureData] = useState([]);
  const [backImgUrl, setBackImgUrl] = useState();
  const [picItem, setPicItem] = useState({});

  const style = {
    backgroundImage: `url(${backImgUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const movieOverview = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/697843",
    params: { language: "ja-JP" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjIyNzRiMzJjMTgwM2ZmNWJmMGFkYjg2ZmNiZmQ4ZCIsInN1YiI6IjY0NmRjYjc0OTY2MWZjMDExZDk1NzlhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6abkUx93_XOwAaIbBxBseBK-1KBWYpoBLMKoIdQ7U9I",
    },
  };

  const backdropPicture = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/697843/images",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjIyNzRiMzJjMTgwM2ZmNWJmMGFkYjg2ZmNiZmQ4ZCIsInN1YiI6IjY0NmRjYjc0OTY2MWZjMDExZDk1NzlhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6abkUx93_XOwAaIbBxBseBK-1KBWYpoBLMKoIdQ7U9I",
    },
  };

  const getOverview = async () => {
    try {
      const overviewResults = await axios.request(movieOverview);
      if (overviewResults.data) {
        console.log(overviewResults.data);
        setViewData(overviewResults.data);
        setBackImgUrl(
          imgUrl + overviewResults.data.belongs_to_collection.backdrop_path
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPicture = async () => {
    try {
      const pictureResults = await axios.request(backdropPicture);
      if (pictureResults.data) {
        setPictureData(pictureResults.data.backdrops);
        console.log("pic", pictureData);
        for (let i = 0; i < 5; i++) {
          const items = [...picItem];
          items.push(pictureData[i]);
          setPicItem(items);
        }
        console.log("picture", picItem);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOverview();
    // getPicture();
    console.log("pic", picItem);
  }, []);

  return (
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
              <h1 className="overviewTitle">{viewData.title}</h1>
              <div className="informationMiddle">
                <div className="releaseDate">
                  <h4 className="detailItem">公開日</h4>
                  <div className="date">
                    <p className="overviewParagraph">{viewData.release_date}</p>
                  </div>
                </div>
                <div className="genres">
                  <h4 className="detailItem">ジャンル</h4>
                  {viewData.genres ? (
                    <div className="nameContainer">
                      {viewData.genres.map((element, i) => (
                        <p key={i} className="genreName overviewParagraph">
                          {element.name}&nbsp;&nbsp;
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
      {/* <div className="picture">
        {() => {
          const items = [];

          return console.log("item", items);
        }}
      </div> */}
    </div>
  );
}
