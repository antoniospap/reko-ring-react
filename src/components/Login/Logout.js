/**
 * Login
 */
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const Logout = ( { logout } ) => {
  useEffect(() => {
    window.FB.getLoginStatus(function (response) {
      window.FB.logout();
    });
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("userID");

    logout();
  }, []);

  
};

export default Logout;
