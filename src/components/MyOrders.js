import React, { useState, useEffect } from 'react';
import DataService from '../services/requests';
import { useNavigate } from 'react-router-dom';


function MyOrders() {
  const userID = window.localStorage.getItem('userID');
  const [carts, setCarts] = useState([]);
  const [archivedCarts, setArhivedCarts] = useState([]);
  const [updateArchive, setUpdateArchive] = useState([]);

  const [success, setSuccess] = useState('');

  useEffect(() => {
    (async function () {
      try {
        const res = await DataService.getAllUserCarts(userID);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].archive == true) {
            setArhivedCarts(prevState => [...prevState, res.data[i]]);
          }
          if (res.data[i].archive == false) {
            setCarts(prevState => [...prevState, res.data[i]]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [updateArchive]);


  const handleCancel = async cartID => {
    let cartss = [...carts];
    if (window.confirm('Är du säker på att du vill ta bort din order? Detta kan inte ångras!')) {
      try {
        const res = await DataService.cancelCart(cartID);
        var index = carts.map(function(e) { return e._id; }).indexOf(cartID);
        cartss.splice(index, 1)
        setCarts(cartss)
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleArchive = async cartID => {
    let cartss = [...carts];

    try {
      const res = await DataService.archiveCart(cartID, { archive: true });
      var index = carts.map(function(e) { return e._id; }).indexOf(cartID);
      cartss[index].archive = true;
      setArhivedCarts([...archivedCarts, carts[index]]);
      cartss.splice(index, 1)
      setCarts(cartss);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
            {success && <div className="sucess-message">{success}</div>}

      <div className="d-flex flex-column align-items-center orders">
        <h3>Aktiva orders:</h3>
        <div className="d-flex flex-row justify-content-start myOrders">
          {carts.map((cart, index) => {
            let totalPrice = 0;

            //cancel & archieve btns
            let cancelDisplay;
            let archive;

            if (cart.orderStatus == 'pending') cancelDisplay = 'block';
            else cancelDisplay = 'none';

            if (cart.orderStatus == 'accepted' || cart.orderStatus == 'rejected') archive = 'block';
            else archive = 'none';

            //overflow on carts with 3+ products
            let cssStyle = { overflow: 'initial' };
            let cssStyleStatus = { top: '-15px' };

            if (cart.products.length > 3) {
              cssStyle.overflow = 'auto';
              cssStyle.paddingTop = '30px';

              cssStyleStatus.top = '0px';
            }

            return (
              <div key={index} className="oneOrder" style={cssStyle}>
                <div className="container d-flex">
                  <div className="col-md-3 btn-basic myOrdersBtns" style={{ display: cancelDisplay }} onClick={() => handleCancel(cart._id)}>
                    Cancel
                  </div>
                  <div className="col-md-6 text-center">
                    Samlingsdatum: <br /> {cart.dealingDate}
                  </div>
                  <div className="col-md-3" style={{ display: archive }}>
                    <button onClick={() => handleArchive(cart._id)}>Arkivera</button>
                  </div>
                </div>
                <div className="container-fluid d-flex align-items-center" style={{ borderBottom: '1px solid rgb(187, 187, 187)' }}>
                  <div className="col-md-8">
                    <p>Produkt</p>
                  </div>
                  <div className="col-md-2">
                    <p>Antal</p>
                  </div>
                  <div className="col-md-2">
                    <p>Pris st</p>
                  </div>
                </div>
                {cart.products.map((product, index) => {
                  let priceXquantity = parseInt(product.pPrice) * parseInt(product.pQuantity);
                  totalPrice += priceXquantity;
                  return (
                    <div className="item container-fluid d-flex align-items-center" key={index}>
                      <div className="col-md-4">
                        <img src={'./pics/' + product.pImg} className="img-fluid cartImg" alt="Product img" />
                      </div>
                      <div className="col-md-4">
                        <p>{product.pName}</p>
                      </div>

                      <div className="col-md-2">
                        <p>{product.pQuantity + ' st'}</p>
                      </div>

                      <div className="col-md-2">
                        <p>{product.pPrice * product.pQuantity}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex align-self-end orderPrice justify-content-between">
                  <div className="dates">
                    <span>
                      Order skapad: <br /> {cart.createdAt}
                    </span>
                  </div>
                  <div>
                    <span>
                      Totalt pris: <b>{totalPrice}:-</b>
                    </span>
                  </div>
                </div>

                <div className="d-flex mt-1 dates"></div>
                <div className={'d-flex cartStatus ' + cart.orderStatus} style={cssStyleStatus}>
                  <span className="status">{cart.orderStatus}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="d-flex flex-column align-items-center orders">
        <h3>Arkiverade:</h3>
        <div className="d-flex flex-row justify-content-start myOrders">
          {archivedCarts.map((cart, index) => {
            let totalPrice = 0;
            //overflow on carts with 3+ products
            let cssStyle = { overflow: 'initial' };
            let cssStyleStatus = { top: '-15px' };

            if (cart.products.length > 3) {
              cssStyle.overflow = 'auto';
              cssStyle.paddingTop = '30px';

              cssStyleStatus.top = '0px';
            }
            return (
              <div key={index} className="oneOrder" style={cssStyle}>
                <div className="container d-flex">
                  <div className="col-md-6 text-center">
                    Samlingsdatum: <br /> {cart.dealingDate}
                  </div>
                </div>
                <div className="container-fluid d-flex align-items-center" style={{ borderBottom: '1px solid rgb(187, 187, 187)' }}>
                  <div className="col-md-8">
                    <p>Produkt</p>
                  </div>
                  <div className="col-md-2">
                    <p>Antal</p>
                  </div>
                  <div className="col-md-2">
                    <p>Pris st</p>
                  </div>
                </div>
                {cart.products.map((product, index) => {
                  let priceXquantity = parseInt(product.pPrice) * parseInt(product.pQuantity);
                  totalPrice += priceXquantity;
                  return (
                    <div className="item container-fluid d-flex align-items-center" key={index}>
                      <div className="col-md-4">
                        <img src={'./pics/' + product.pImg} className="img-fluid cartImg" alt="Product img" />
                      </div>
                      <div className="col-md-4">
                        <p>{product.pName}</p>
                      </div>
                      <div className="col-md-2">
                        <p>{product.pQuantity + ' st'}</p>
                      </div>
                      <div className="col-md-2">
                        <p>{product.pPrice * product.pQuantity}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex align-self-end orderPrice justify-content-between">
                  <div className="dates">
                    <span>
                      Order skapad: <br /> {cart.createdAt}
                    </span>
                  </div>
                  <div>
                    <span>
                      Totalt pris: <b>{totalPrice}:-</b>
                    </span>
                  </div>
                </div>

                <div className="d-flex mt-1 dates"></div>
                <div className={'d-flex cartStatus ' + cart.orderStatus} style={cssStyleStatus}>
                  <span className="status">{cart.orderStatus}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
