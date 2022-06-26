/**
 * Index page, renders all farms with description
 */

import React, { useState, useEffect } from "react";
import DataService from "../services/requests";
import { Link } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [farms, setFarms] = useState([]);

  //tells react that component needs to do something after rendering HTML
  useEffect(() => {
    retrieveArticles();
  },[]);

  const retrieveArticles = async () => {
    const res = await DataService.getArticles();
    const favProperties = res.data;
    setArticles(res.data ?? []);
    let farmInfo = []
    const fetchedUrls = await Promise.all(
        favProperties?.map(async (el) => (
          farmInfo.push(await secondFunction(el.farmID)) /** use el to pass some ID */
        ))
      );
      setFarms(farmInfo ?? [])
  }
  const secondFunction = async (farmID) => {
    const res = await DataService.getFarmByID(farmID);
    if (res.data) return res.data[0]
  };
  
  return (
    <div id="articles">
      {articles.map((article, i) => {
        return (
          <div className="article" id={article._id} key={article._id}>
            <Link to={article._id}>
              <img className="img-fluid" src={'./pics/'+farms[i]?.farmImg ?? 'no-image.jpg'} alt="article" />
              <div className="cardOverlay text-white">
              <h4 className="">{farms[i]?.farmName ?? ''}</h4>
              <p className="">{farms[i]?.description ?? ''}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleList;
