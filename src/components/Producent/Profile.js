import React, { useState, useEffect } from "react";
import DataService from "../../services/requests";

function Profile() {
  const userID = window.localStorage.getItem('userID');
  const [farm, setFarm] = useState({});
  const [updateFarm, setUpdateFarm] = useState({userID: userID});
  const [success, setSuccess] = useState('');


  useEffect(() => {
    async function retrieveFarm (){
      try {
        const res = await DataService.getFarmByID(userID);
        if (res.data) setFarm(res.data ?? {});
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

    //if user has not created profile for his farm then create POST
    if (Object.keys(farm).length == 0){
      try {
        const res = await DataService.createFarm(updateFarm);
        setFarm(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    //if user already has a profile, update it.
    else {
      try {
        const res = await DataService.updateFarm(updateFarm);
        if (res.status === 200){
          setFarm(res.data)
          setSuccess("Uppdaterat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  let display = {
    display: 'none',
};

if (Object.keys(farm).length > 0  || (updateFarm.farmName != undefined || updateFarm.description != undefined)) {
  display = {
    display: 'block',
  };
}
 
  //if (farm.farmImg == "") farm.farmImg = "../pics/no-image.jpg"

  return (
    <div className="d-flex flex-column">
      {success && <div className="sucess-message">{success}</div>}
      <div className="profileForm">
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
      </div>
        
      <div className="seeProfile">
        
        <div className="d-flex flex-column align-items-center text-center">
            <div>
                <h3>Så här kommer din profil att se ut för andra:</h3>
                <span className="smallText">(spara för att se bilden)</span>
            </div>
            
            <div className="article" id={farm._id ?? ''}>
              <img className="img-fluid" src={`./pics/${farm?.farmImg}`} alt="Card image"/>
              <div className="cardOverlay text-white">
                <h5 className="">{updateFarm.farmName ? updateFarm.farmName : farm.farmName}</h5>
                <p className="">{updateFarm.description ?? farm.description}</p>
              </div>
            </div>
        </div>
      </div>
    </div>
    
  );
}

export default Profile;
