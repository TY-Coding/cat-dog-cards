import React, { useState } from 'react';
import '../styles/Card.scss'; //Card 樣式

import { spinner } from './spinner';
import { ApiUrl } from '../utils/config';

//====== below api connect tool start ======//
import axios from 'axios';

function CardDetail() {
  const [loading, setLoading] = useState(false);
  const [petData, setPetData] = useState();
  console.log('petData:', petData); //for check

  const handleDrawCard = () => {
    setLoading(true);
    async function sendSubmit() {
      try {
        const sendApi = await axios.get(ApiUrl);
        console.log('Get sendApi:', sendApi.data);
        setPetData(sendApi.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    sendSubmit();
  };

  let style = {
    backgroundImage: "url('')",
  };
  if (petData) {
    style = {
      backgroundImage: `url(${petData.imageSrc})`,
    };
  }

  return (
    <>
      {loading ? (
        spinner
      ) : (
        <div className="wrapper">
          <div className="card z-20">
            <input
              type="checkbox"
              id="card1"
              className="more"
              aria-hidden="true"
            />
            {petData === undefined ? (
              ''
            ) : (
              <div className="content">
                <div className="front" style={style}>
                  <div className="inner">
                    <h2>喵喵狗狗共和卡</h2>
                    <label
                      htmlFor="card1"
                      className="button"
                      aria-hidden="true"
                    >
                      Details
                    </label>
                  </div>
                </div>
                <div className="back">
                  <div className="inner">
                    <div className="description">
                      <p>{petData && petData.description}</p>
                    </div>
                    <label
                      htmlFor="card1"
                      className="button return"
                      aria-hidden="true"
                    >
                      return
                    </label>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleDrawCard}
              className="px-7 py-3 w-full rounded dark:bg-blue-50 dark:text-slate-800 bg-slate-800 text-blue-50 dark:hover:bg-slate-800 dark:hover:text-blue-50 hover:bg-blue-50 hover:text-slate-800"
            >
              請抽一張卡
            </button>

            {/* <UnsplashReact
            accessKey={MY_ACCESS_KEY}
            Uploader={withDefaultProps(Base64Uploader, { name: 'event[logo]' })}
          /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default CardDetail;
