import React, { useState, useEffect } from 'react';
import DataService from '../../services/requests';
import { useNavigate, Link } from 'react-router-dom';

function MyOrders() {
  const userID = window.localStorage.getItem('userID');
  const [articles, setArticles] = useState([]); // all farms articles
  const [carts, setCarts] = useState([]); // all farms articles

  const [pendingCarts, setPendingCarts] = useState([{ carts: [] }]);
  const [acceptedCarts, setAacceptedCarts] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await DataService.getAllArticlesOfUserID(userID);
        setArticles([...res.data]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center m-1">
      <div className="text-center site-description mb-5">
        <h2>Mina Artiklar</h2>
        <p>Här kan du se alla dina skapade artiklar. <br/> Genom att klicka på en artikel kan du se vilka som laggt beställningar och acceptera eller avvisa dem.</p>
        </div>

      <div className="d-flex flex-column articlesAndCarts">
        <div className="align-self-center">
          <h3>Aktiva orders:</h3>
        </div>
        <div className="d-flex flex-wrap farmOrders" id="activeOrders">
          {articles.map((article, index) => {
            return (
              <div className="oneRowOrderAndCarts d-flex" key={article._id}>
                <Link to={'/orders/' + article._id}>
                  <div key={index} className="oneFarmOrder cartProduct" style={{ marginBottom: '0px' }}>
                    <div className="text-center">
                      <b>Din order:</b>
                      <br />
                      <i>Samlingsdatum: {article.dealingDate}</i>
                    </div>
                    <div className="container-fluid d-flex justify-content-around cartProduct" style={{ fontWeight: '700' }}>
                      <div className="col-md-5">
                        <p>Produkt</p>
                      </div>

                      <div className="col-md-3">
                        <p>Antal</p>
                      </div>

                      <div className="col-md-3">
                        <p>Pris st</p>
                      </div>
                    </div>
                    {article.products.map((product, index) => {
                      if (product.pImg == '') product.pImg = 'no-image.jpg';

                      return (
                        <div className="container-fluid d-flex align-items-center justify-content-around cartProduct" key={product._id}>
                          {/*<div className="col-md-4">
                          <img src={'./pics/' + product.pImg} className="img-fluid cartImg" alt="Product img" />
                    </div>*/}
                          <div className="col-md-5">
                            <p>{product.pName}</p>
                          </div>

                          <div className="col-md-3">
                            <p>{product.pQuantity + ' st'}</p>
                          </div>

                          <div className="col-md-3">
                            <p>{product.pPrice}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
