import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DataService from '../../services/requests';

function OneArticle() {
  const { id } = useParams(); //url parameter after / URL
  const userID = window.localStorage.getItem('userID');
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        const resCarts = await DataService.getAllCartsOfArticle(id);
        setCarts(resCarts.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);


  const changeOrderStatus = async (status, cartID, index) => {
    let cartss = [...carts];

    try {
      const res = await DataService.updateCartStatus(cartID, { orderStatus: status });
      //setCarts(carts => carts.map((cart, i) => (i == index ? res.data : carts[i]))); funkar ej då realm inte ger tillbaka updated object
      var index = carts.map(function(e) { return e._id; }).indexOf(cartID);
      cartss[index].orderStatus = status;
      setCarts(cartss)

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center m-1">
      <div className="d-flex align-items-center backArrow">
        <div className="d-flex align-items-center ordersHeader">
          <Link to={'/farmOrders/'} className="remove_links">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
            Mina Artiklar
          </Link>
        </div>

        <div className="ordersHeader text-center">
          <h2>Beställningar</h2>
        </div>

        <div className="ordersHeader"></div>
      </div>

      <div className="text-center site-description mb-3">
        <p>Här ser du vilka som laggt beställningar och kan sedan acceptera eller avvisa deras order. </p>
      </div>

      <div className="align-self-center">
        <h3>Aktiva orders:</h3>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-center mb-5 cartItem">
        {carts.map((cart, index) => {
          let cssStyle = { overflow: 'initial' };
          let cssStyleStatus = { top: '-15px' };

          if (cart.products.length > 3) {
            cssStyle.overflow = 'auto';
            cssStyle.paddingTop = '30px';

            cssStyleStatus.top = '0px';
          }

          let totalPrice = 0;
          if (0 === 0) {
            return (
              <div className="cart farmOrdersCart d-flex flex-column mb-5" style={cssStyle} key={index}>
                <div className="d-flex flex-row justify-content-center">
                  <div>
                    <button onClick={() => changeOrderStatus('accepted', cart._id, index)}>Accept</button>
                  </div>
                  <div className="text-center">
                    <p>Antonios Papathanassiadis</p>
                  </div>
                  <div>
                    <button onClick={() => changeOrderStatus('rejected', cart._id, index)}>Reject</button>
                  </div>
                </div>

                <div className="container-fluid d-flex align-items-center">
                  <div className="col-md-4">
                    <p>Produkt</p>
                  </div>

                  <div className="col-md-4">
                    <p>Antal</p>
                  </div>

                  <div className="col-md-4">
                    <p>Pris st</p>
                  </div>
                </div>
                {cart.products.map((product, index) => {
                  let priceXquantity = parseInt(product.pPrice) * parseInt(product.pQuantity);
                  totalPrice += priceXquantity;
                  return (
                    <div className="item container-fluid d-flex align-items-center" key={index}>
                      <div className="col-md-4">
                        <p>{product.pName}</p>
                      </div>

                      <div className="col-md-4">
                        <p>{product.pQuantity + ' st'}</p>
                      </div>

                      <div className="col-md-4">
                        <p>{product.pPrice}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex align-self-end orderPrice ">
                  <span>
                    Totalt pris: <b>{totalPrice}:-</b>
                  </span>
                </div>
                <div className={'d-flex cartStatus ' + cart.orderStatus} style={cssStyleStatus}>
                  <span className="status">{cart.orderStatus}</span>
                </div>
              </div>
            );
          } else {
            return;
          }
        })}
      </div>
    </div>
  );
}

export default OneArticle;
