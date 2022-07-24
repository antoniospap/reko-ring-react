import React, { useState, useEffect } from 'react';
import DataService from '../services/requests';
import { useNavigate } from 'react-router-dom';

function Cart(props) {
  const userID = window.localStorage.getItem('userID');
  const [items, setItems] = useState(props.item);
  const [activateBuyBtn, setActivateBuyBtn] = useState(false);
  const navigate = useNavigate();
  let totalPrice = 0;

  if (!props.show) return null;

  if(props.item.products.length > 0 && activateBuyBtn === false) setActivateBuyBtn(true);


  const cofirmCart = async () => {
    try {
      let res = await DataService.completeCart(props.item);
      if (res.status == 201) navigate('/myOrders');
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = (e, index, product) => {
    //remove from frontend div
    document.querySelector('.product' + index).innerHTML = '';

    //change price after delete
    let deletedItemPrice = product.pPrice * product.pQuantity;
    totalPrice = totalPrice - deletedItemPrice;
    document.querySelector('#totalCartPrice #price').innerHTML = totalPrice + ':-';

    //remove from props.array that gets send to backend to create order.
    for (let i = 0; i < props.item.products.length; i++) {
      if (props.item.products[i].pID === product.pID) props.item.products.splice(props.item.products[i], 1);
    }

    //deactivate buy btn if there is not items in cart
    if (props.item.products.length == 0) {
      setActivateBuyBtn(false);
      document.querySelector('#completeCart').style.opacity = 0.5;
    }

    document.getElementById('cartProductsCount').innerHTML = props.item.products.length;
  };

  return (
    <div id="cartBackground">
      <div id="cartOverlay">
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '15%' }}></div>
          <div className="text-center" style={{ width: '70%' }}>
            <h3>Kundvagn</h3>
          </div>
          <div className="btn-basic" onClick={props.onClose} style={{ width: '15%' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
        <div className="container" id="productTable">
          <div className="cartHeader row align-items-center">
            <p className="col-md-5">Produkt</p>
            <p className="col-md-2">Antal</p>
            <p className="col-md-3">Pris styck</p>
          </div>
        </div>

        <div className="cartProducts container">
          {props.item.products.map((product, index) => {
            let priceXquantity = parseInt(product.pPrice) * parseInt(product.pQuantity);
            totalPrice += priceXquantity;
            return (
              <div className={'cartProduct row align-items-center product' + index} key={index}>
                <div className="col-md-5">
                  <p>{product.pName}</p>
                </div>
                <div className="col-md-2">
                  <p>{product.pQuantity}</p>
                </div>
                <div className="col-md-3">
                  <p>{product.pPrice + ':-'}</p>
                </div>
                <div className="col-md-2" onClick={e => removeFromCart(e, index, product)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                  </svg>
                </div>
              </div>
            );
          })}
          <div id="totalCartPrice" className="d-flex align-self-end orderPrice">
            <span>
              Totalt pris: <b id="price">{totalPrice}:-</b>
            </span>
          </div>
        </div>
        <div id="completeCart" className="btn-basic completeCart" onClick={activateBuyBtn ? cofirmCart : undefined}>
          Köp
        </div>
      </div>
    </div>
  );
}

export default Cart;
