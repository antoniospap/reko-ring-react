import React, { useState, useEffect } from 'react';
import DataService from '../../services/requests';

function CreateArticle() {
  const userID = window.localStorage.getItem('userID');
  const [moreProducts, setMoreProducts] = useState([1]);
  const [data, setData] = useState({ dealingDate: '', userID: '62b5f9a9fede1c3b2cdb0480', products: [] });
  const [success, setSuccess] = useState('');

  const [product, setProduct] = useState([
    {
      pName: '',
      pQuantity: '',
      pPrice: '',
      pDesc: '',
      pImg: '',
    },
  ]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await DataService.createArticle(data);
      if (res.status === 200) setSuccess('Din artikel har publicerats, gå till första sidan för att hitta den!');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * On + click, push to moreProducts state array to map it later when showing inputs HTML.
   */
  const addMoreProducts = () => {
    let obj = {
      pName: '',
      pQuantity: '',
      pPrice: '',
      pDesc: '',
      pImg: '',
    };

    setMoreProducts([...moreProducts, [1]]);
    for (let i = 0; i < moreProducts.length; i++) {
      setProduct([...product, obj]);
    }
  };

  /**
   *
   * @param {*} e
   * OnChangeInput format an object with the form data, to POST it to AXIOS on submit.
   */

  const onchangeInput = (e, index) => {
    let article = { ...data };
    let pData = [...product];

    if (e.target.name === 'dealingDate') article[e.target.name] = e.target.value;
    else pData[index][e.target.name] = e.target.value;

    setProduct(pData);
    setData({ ...data, dealingDate: article['dealingDate'], products: pData });
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h3 className="text-center mt-3 mb-3">Lägg till Artikel inför Reko-ring:</h3>
      <div className="addArticle">
        <div>
          <label htmlFor="descriptionText" className="form-label">
            Inför reko-rings samnligsplats, datum:
          </label>
          <input
            type="date"
            id="setDate"
            name="dealingDate"
            max="2030-12-31"
            onChange={e => {
              onchangeInput(e);
            }}
            required
          />
          <br />
          <br />
        </div>

        <div id="addProducts">
          {moreProducts.map((one, index) => (
            <div className="addProduct container" key={index}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="productNamn" className="form-label">
                    Produkt namn
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product"
                    placeholder="Vita ägg 24st/pack"
                    name="pName"
                    onChange={e => {
                      onchangeInput(e, index);
                    }}
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="quantity" className="form-label">
                    Antal pack/liter/vikt
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    name="pQuantity"
                    onChange={e => {
                      onchangeInput(e, index);
                    }}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="quantity" className="form-label">
                    Pris
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="pPrice"
                    onChange={e => {
                      onchangeInput(e, index);
                    }}
                    step=".01"
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-8">
                  <label htmlFor="productNamn" className="form-label">
                    Valfri beskrivnig av produkten <span className="smallText">(valfri)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product"
                    placeholder="Våra godaste ägg..köps 24st per paket"
                    name="pDesc"
                    onChange={e => {
                      onchangeInput(e, index);
                    }}
                  />
                </div>

                <div className="col-md-4 align-self-end">
                  <label htmlFor="productPic" className="form-label">
                    Lägg till bild <span className="smallText">(valfri)</span>
                  </label>
                  <input
                    type="file"
                    id="productPic"
                    name="pImg"
                    onChange={e => {
                      onchangeInput(e, index);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="addMoreProducts" onClick={addMoreProducts}>
          <span>+</span>
        </div>
        <input type="submit" id="submitArticle" className="mt-3 align-self-end" />
      </div>

      {success && <div className="sucess-message">{success}</div>}
    </form>
  );
}

export default CreateArticle;
