/**
 * @route /:id
 * Renders one farm and the article to sell products
 */

import React, { useState, useEffect } from 'react';
import DataService from '../services/requests';
import { useParams } from 'react-router-dom';
import Cart from './Cart';

const OneArticleByFarm = props => {
  const { id } = useParams(); //url parameter after / URL
  const userID = window.localStorage.getItem('userID');

  const [article, setArticle] = useState({});
  const [farm, setFarm] = useState([]);

  const [item, setItem] = useState({ userID: userID, articleID: id, dealingDate: '', createdAt: '', products: [] });
  const [product1, setProduct] = useState([]);
  const [qty, setQty] = useState(1);
  const [clicked, setClicked] = useState(true);
  const [amount, setAmount] = useState(0);

  const [show, setShow] = useState(false); //show cart

  useEffect(() => {
    retrieveArticle(id);
  }, []);

  useEffect(() => {
    setItem({ ...item, products: product1 });
  }, [product1]);

  useEffect(() => {
    setAmount(item.products.length);
  }, [item]);

  useEffect(() => {
    if (amount > 0) updateCartAnimation();
  }, [amount]);


  const updateCartAnimation = () => {
    var cartBtn = document.getElementById('cartProductsCount');
    cartBtn.classList.add('itemCount');
    cartBtn.style.animationName = "none";

    requestAnimationFrame(() => {
      cartBtn.style.animationName = "";
    })
  }

  const retrieveArticle = async id => {
    try {
      let res = await DataService.getArticlesByID(id);
      let resFarmInfo = await DataService.getFarmByID(res.data[0].userID);
      setFarm(resFarmInfo.data ?? []);
      setArticle(res?.data[0] ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const addCart = (product, dealingDate, productID) => {
    let productObj = {
      pDesc: product.pDesc,
      pID: productID,
      pImg: product.pImg,
      pName: product.pName,
      pPrice: product.pPrice,
      pQuantity: qty.toString(),
      _id: product._id,
    };

    let formatter = new Intl.DateTimeFormat([], {
      timeZone: 'Europe/Stockholm',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    setProduct([...product1, productObj]);
    setItem({ ...item, dealingDate: dealingDate, createdAt: formatter.format(new Date()) });

  };

  const qtyHandler = (e, p) => {
    //if buttons gets clicked this happens
    if (e.target == undefined) {
      e.target = e;
      e.target.value = e.value;
    }

    //block if inputed qty is higher than available qty
    if (e.target.value > parseInt(p.pQuantity)) {
      setClicked(false);
      e.target.parentNode.parentNode.querySelector('.buyBtn').style.opacity = 0.5;
      e.target.parentNode.parentNode.querySelector('.buyBtn').innerHTML = `Maximalt antal ${p.pQuantity}`;
    } else {
      setClicked(true);
      e.target.parentNode.parentNode.querySelector('.buyBtn').style.opacity = 1;
      e.target.parentNode.parentNode.querySelector('.buyBtn').innerHTML = `Lägg i varukorg`;
    }
    setQty(e.target.value);
  };

  const inputBtn = (e, upORDown, product) => {
    if (upORDown === 'down') e.target.parentNode.querySelector('input[type=number]').stepDown();
    if (upORDown === 'up') e.target.parentNode.querySelector('input[type=number]').stepUp();

    qtyHandler(e.target.parentNode.querySelector('input[type=number]'), product);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="text-center">
        <h3 id="farmName">{farm.farmName}</h3>
        <p id="farmDesc">Samlingsplatsdatum: {article.dealingDate}</p>
      </div>
      <div className="d-flex flex-row justify-content-evenly container" id="productCart">
        <div id="products" className="d-flex flex-row">
          {article.products?.map((product, index) => {
            if (product.pImg == '') product.pImg = 'no-image.jpg';
            return (
              <div className="card mb-3" style={{ maxWidth: '540px', margin: '0px 15px' }} key={index} id={product._id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img className="img-fluid rounded-start articleImg" src={'./pics/' + product.pImg} alt="article" />
                  </div>

                  <div className="col-md-8">
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.pName ?? ''}</h5>
                      <p className="card-text">{product.pDesc ?? ''}</p>
                      <div className="d-flex justify-content-around">
                        <p className="card-text">
                          <b>Pris:</b> {product.pPrice + ':-'}
                        </p>
                        <p className="card-text">
                          <b>Antal kvar:</b> {product.pQuantity + 'st'}
                        </p>
                      </div>
                      <div className="d-flex justify-content-around inputBuyRow">
                        <div className="d-flex inputQty">
                          <button onClick={e => inputBtn(e, 'down', product)}>-</button>
                          <input className="quantity bg-light form-control" min="1" max={parseInt(product.pQuantity)} defaultValue="1" name="quantity" id="quantity" type="number" required onChange={e => qtyHandler(e, product)} />
                          <button onClick={e => inputBtn(e, 'up', product)} className="plus">
                            +
                          </button>
                        </div>

                        <div className="btn-basic buyBtn" onClick={() => (clicked ? addCart(product, article.dealingDate, product._id) : null)}>
                          Lägg i varukorg
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

        <div className="showCart btn-basic cartBtn" onClick={() => setShow(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          <div id="cartProductsCount">{amount ?? 0}</div>
        </div>
        <Cart onClose={() => setShow(false)} show={show} item={item} />
      </div>
  );
};

export default OneArticleByFarm;
