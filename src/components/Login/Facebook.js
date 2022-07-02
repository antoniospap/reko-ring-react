/**
 * Login
 */
import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import DataService from "../../services/requests";

const Facebook = ({ login }) => {
  const navigate = useNavigate();

  const responseFacebook = async (response) => {
    window.localStorage.setItem("isLoggedIn", true);

    let user = {
      username: response.name,
      fbUserId: response.id,
    };
    //check if there is already a user registered with same fb-ID else create user
    try {
      const res = await DataService.getUserByFBID(user.fbUserId);
      if (res.data[0]) {
        window.localStorage.setItem("userID", res.data[0]._id);
      } else updateDB(user);
    } catch (err) {
      console.log(err);
    }
    login();
    navigate("/home");
  };

  const updateDB = async (user) => {
    try {
      const res = await DataService.createUser(user);
      window.localStorage.setItem("userID", res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  let fbContent;

  fbContent = (
    <FacebookLogin
      appId="2835260340101626"
      autoLoad={false}
      fields="name,email"
      callback={responseFacebook}
    />
  );

  return (
    <div id="login-popup">
      <div id="welcome-text" className="mb-3">
        <h3>Välkommen till Reko-rings administrationspanel</h3>
        <img src="pics/logo-nobg100.png" alt="reko-ring logo" />
      </div>

      <div id="login">{fbContent}</div>
    </div>
  );
};

export default Facebook;
