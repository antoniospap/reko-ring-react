import React, { useState, useEffect } from "react";
import DataService from "../../services/requests";

function Profile() {
  const userID = window.localStorage.getItem('userID');
  const [farm, setFarm] = useState();
  const [updateFarm, setUpdateFarm] = useState({userID:userID});



  useEffect(() => {
    async function retrieveFarm (){
      try {
        const res = await DataService.getFarmByID(userID);
        console.log(res.data);
        if (res.data.length != 0) setFarm(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    retrieveFarm();
  },[]);


  const handleChange = (e) => {
    setUpdateFarm({
      ...updateFarm,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(farm);
    console.log(updateFarm);

    if (!farm){
      try {
        const res = await DataService.createFarm(updateFarm);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      try {
        const res = await DataService.updateFarm(updateFarm,userID);
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (farm) {
    if (farm.farmImg == "") farm.farmImg = "../pics/no-image.jpg";
  }
  return (
    <div>
        <form method="POST" onSubmit={handleSubmit}>
              <div className="addArticle red">
                  <div className="mb-3">
                      <label htmlFor="farmName" className="form-label">Gårdsnamn</label>
                      <input type="text" className="form-control" id="farmName" placeholder="Växjö Gård" name="farmName" onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                      <label htmlFor="descriptionText" className="form-label">Valfri beskrivande text för gården <span className="smallText">(valfri)</span></label>
                      <textarea className="form-control" id="description" rows="3" placeholder="Växjös Djurgård..." name="description" maxLength ="150" onChange={handleChange}></textarea>
                  </div>

                  <div id="profileImg">
                      <label htmlFor="productPic" className="form-label">Lägg till bild <span className="smallText">(valfri)</span></label>
                      <input type="file" id="productPic" name="farmImg" onChange={handleChange}/>
                  </div>

                  <div id="submitProfile">
                      <input type="submit" value="Spara" />
                  </div>

              </div>
          </form>

        <div className="d-flex flex-column align-items-center text-center">
            <div>
                <h3>Så här kommer din profil att se ut för andra:</h3>
                <span className="smallText">(spara för att se bilden)</span>
            </div>
            
        </div>
    </div>
    
  );
}

export default Profile;
