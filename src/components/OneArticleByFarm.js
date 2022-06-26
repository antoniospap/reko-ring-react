/**
 * @route /:id
 * Renders one farm and the article to sell products
 */

import React, { useState, useEffect } from "react";
import DataService from "../services/requests";
import { useParams } from "react-router-dom";

const OneArticleByFarm = props => {
  const { id } = useParams();
  const [farms, setFarms] = useState([]);

  //tells react that component needs to do something after rendering HTML,
  //array at the end means that it only updates each time the array updates
  useEffect(() => {
    retrieveArticle(id);
  }, []);

  const retrieveArticle = async id => {
    try {
      let res = await DataService.getArticlesByID(id);
      console.log(res.data);
      setFarms(res?.data ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      class="d-flex flex-row justify-content-evenly container"
      id="productCart"
    >
      <div id="products" className="col-md-auto">
        {farms.products?.map(product => {
          return (
            <div
              className="card mb-3"
              style={{ maxWidth: "540px" }}
              key={product._id}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={"./pics/" + product.pImg}
                    className="img-fluid rounded-start articleImg"
                    alt="image of the product"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.pName}</h5>
                    <p className="card-text">{product.pDesc}</p>
                    <div className="d-flex justify-content-around">
                      <p className="card-text">
                        <b>Pris:</b> {product.pPrice + ":-"}
                      </p>
                      <p className="card-text">
                        <b>Antal i lager:</b> {product.pQuantity + "st"}
                      </p>
                    </div>
                    <div className="d-flex justify-content-around">
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="cart[][pQuantity]"
                        min="1"
                        max={product.pQuantity}
                        defaultValue="1"
                        required
                      />
                      <button className="cart">Lägg till i kundvagn</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OneArticleByFarm;
