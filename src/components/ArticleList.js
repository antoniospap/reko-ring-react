/**
 * Index page, renders all farms with description
 */

import React, { useState, useEffect } from 'react';
import DataService from '../services/requests';
import { Link } from 'react-router-dom';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [farms, setFarms] = useState([]);

  //tells react that component needs to do something after rendering HTML
  useEffect(() => {
    retrieveArticles();
  }, []);

  const retrieveArticles = async () => {
    const res = await DataService.getArticles();
    const favProperties = res.data;
    setArticles(res.data ?? []);
    let farmInfo = [];
    const fetchedUrls = await Promise.all(favProperties?.map(async el => farmInfo.push(await secondFunction(el.farmID)) /** use el to pass some ID */));
    setFarms(farmInfo ?? []);
  };
  const secondFunction = async farmID => {
    const res = await DataService.getFarmByID(farmID);
    if (res.data) return res.data;
  };

  return (
    <div id="homePage">
      <div id="reko">
        <img className="img-fluid" src="./pics/home.png" alt="homepage welcome image, information about reko ring" onClick={e => e.preventDefault()} />

        <div className="checkout-portofolio">
          <div className="checkout-project">
            <h3>Här hittar du producenter och produkter</h3>
          </div>
          <div className="c-scroll-icon">
            <div className="c-scroll-icon-line-mask">
              <div className="c-scroll-icon-line"></div>
            </div>
            <div className="c-scroll-icon-triangle">
              <div className="c-scroll-icon-triangle-mask first">
                <div className="c-scroll-icon-triangle-line first"></div>
              </div>
              <div className="c-scroll-icon-triangle-mask right">
                <div className="c-scroll-icon-triangle-line right"></div>
              </div>
              <div className="c-scroll-icon-triangle-mask left">
                <div className="c-scroll-icon-triangle-line left"></div>
              </div>
              <div className="c-scroll-icon-triangle-mask last">
                <div className="c-scroll-icon-triangle-line last"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="producers" className='d-flex flex-column align-items-center mt-3'>
        <div>
          <h2>Producenter</h2>
        </div>

        <div className='d-flex flex-wrap' id='articles'>
          {articles.map((article, i) => {
            return (
              <div className="article" id={article._id} key={article._id}>
                <Link to={'/' + article._id ?? ''}>
                  <img className="img-fluid" src={'./pics/' + farms[i]?.farmImg ?? 'no-image.jpg'} alt="article" />
                  <div className="cardOverlay text-white">
                    <h4 className="">{farms[i]?.farmName ?? ''}</h4>
                    <p className="">{farms[i]?.description ?? ''}</p>
                    <p className="">{article.dealingDate ?? ''}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
