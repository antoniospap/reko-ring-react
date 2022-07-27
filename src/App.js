import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import OneArticleByFarm from "./components/OneArticleByFarm";

/* LOGIN */
import Logout from "./components/Login/Logout";
import Facebook from "./components/Login/Facebook";

/* PRODUCENT */
import Profile from "./components/Producent/Profile";
import CreateArticle from "./components/Producent/CreateArticle";
import FarmOrders from "./components/Producent/FarmOrders";
import OneArticle from "./components/Producent/OneArticle";

/* KONSUMENT */
import MyOrders from "./components/MyOrders";


const App = () => {
  const [user,setUser] = useState();
  const loggedIn = window.localStorage.getItem('isLoggedIn');

  //if user refreshes user get set to undefined, keep logged in with isLoggedIn variable
  useEffect(() => {
    if (loggedIn == true) setUser(true)
  }, []);

  return (
    <div>
      {loggedIn && (
      <Header />
      )}

      <Routes>
        {!loggedIn && (
          <Route exact path="/" element={<Facebook login={() => setUser(true)}/>} />
        )}
        {loggedIn &&(
          <>
            <Route exact path="/home" element={<ArticleList />} />
            <Route exact path="/:id" element={<OneArticleByFarm />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/create" element={<CreateArticle />} />
            <Route exact path="/myOrders" element={<MyOrders />} />
            <Route exact path="/farmOrders" element={<FarmOrders />} />
            <Route exact path="/orders/:id" element={<OneArticle />} />
            <Route exact path="/logout" element={<Logout logout={() => setUser(null)}/>} />
          </>
        )}
        <Route exact path="*" element={<Navigate to={loggedIn ? "/home" : "/"} />} />

      </Routes>
    </div>
  );
}

export default App;
