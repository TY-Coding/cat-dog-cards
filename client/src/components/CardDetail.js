import React, { useState } from 'react';
import '../styles/Card.scss'; //Card 樣式

//====== below api connect tool start ======//
import axios from 'axios';

function CardDetail() {
  const [petData, setPetData] = useState();
  console.log('petData:', petData); //for check

  const handleDrawCard = () => {
    async function sendSubmit() {
      try {
        const sendApi = await axios.get('http://localhost:8080/api/card');
        console.log('Get sendApi:', sendApi.data);
        setPetData(sendApi.data.data);
      } catch (e) {
        console.log(e);
      }
    }
    sendSubmit();
  };

  const style = {
    backgroundImage: "url('https://picsum.photos/id/237/200/300')",
  };

  return (
    <>
      <div className="wrapper">
        <div className="card z-20">
          <input
            type="checkbox"
            id="card1"
            className="more"
            aria-hidden="true"
          />
          <div className="content">
            <div className="front" style={style}>
              <div className="inner">
                <h2>喵喵狗狗共和卡</h2>
                <label htmlFor="card1" className="button" aria-hidden="true">
                  Details
                </label>
              </div>
            </div>
            <div className="back">
              <div className="inner">
                {/* <div className="info">
                  <span>Sentence</span>
                </div> */}
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
          <button
            onClick={handleDrawCard}
            className="px-7 py-3 w-full rounded dark:bg-blue-50 dark:text-slate-800 bg-slate-800 text-blue-50 dark:hover:bg-slate-800 dark:hover:text-blue-50 hover:bg-blue-50 hover:text-slate-800"
          >
            CHANGE
          </button>

          {/* <UnsplashReact
            accessKey={MY_ACCESS_KEY}
            Uploader={withDefaultProps(Base64Uploader, { name: 'event[logo]' })}
          /> */}
        </div>
      </div>
    </>
  );
}

export default CardDetail;
