import React from 'react';
import '../styles/Card.scss'; //Card 樣式

const style = {
  backgroundImage: "url('https://picsum.photos/id/237/200/300')",
};

function CardDetail() {
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
                <h2>Pet's world</h2>
                <label htmlFor="card1" className="button" aria-hidden="true">
                  Details
                </label>
              </div>
            </div>
            <div className="back">
              <div className="inner">
                <div className="info">
                  <span>Sentence</span>
                </div>
                <div className="description">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Voluptates earum nostrum ipsam ullam, reiciendis nam
                    consectetur? Doloribus voluptate architecto possimus
                    perferendis tenetur nemo amet temporibus, enim soluta nam,
                    debitis.
                  </p>
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
          <button className="px-7 py-3 w-full rounded dark:bg-blue-50 dark:text-slate-800 bg-slate-800 text-blue-50 dark:hover:bg-slate-800 dark:hover:text-blue-50 hover:bg-blue-50 hover:text-slate-800">
            CHANGE
          </button>
        </div>
      </div>
    </>
  );
}

export default CardDetail;
