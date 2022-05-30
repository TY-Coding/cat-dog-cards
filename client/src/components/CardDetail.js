import React, { useState } from 'react';
import '../styles/Card.scss'; //Card 樣式

import { spinner } from './spinner'; //tailwind spinner

//====== below api connect tool start ======//
import axios from 'axios';
import { ApiUrl } from '../utils/config';
//====== above api connect tool start ======//

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

  let logo = {
    backgroundImage: "url('images/cat-dog-logo.jpg')",
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
            {/* {petData === undefined ? (
              ''
            ) : ( */}
              <div className="content">
                <div className="front" style={logo}>
                  <div className="inner">
                    <h2 className="text-3xl text-zinc-700">喵喵狗狗共和卡</h2>
                    <label
                      htmlFor="card1"
                      className="button text-lg text-slate-700 border-4 border-slate-300 hover:border-slate-400"
                      aria-hidden="true"
                    >
                      翻牌
                    </label>
                  </div>
                </div>
                <div className="back" style={style}>
                  <div className="inner">
                    <div className="description">
                      {/* <p>{petData && petData.description}</p> */}
                      <p className="text-xl text-zinc-300">我們就是明星</p>
                    </div>
                    <label
                      htmlFor="card1"
                      className="button text-lg text-slate-700 border-4 border-slate-300 hover:border-slate-400"
                      aria-hidden="true"
                    >
                      返回
                    </label>
                  </div>
                </div>
              </div>
            {/* )} */}

            <button
              onClick={handleDrawCard}
              className="mt-4 px-7 py-3 w-full rounded dark:bg-blue-50 dark:text-slate-800 bg-slate-800 text-blue-50 dark:hover:bg-slate-800 dark:hover:text-blue-50 hover:bg-blue-50 hover:text-slate-800"
            >
              請抽一張卡
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CardDetail;
