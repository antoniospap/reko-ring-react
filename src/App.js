import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import OneArticleByFarm from "./components/OneArticleByFarm";

/* LOGIN */
import Logout from "./components/Login/Logout";
import Facebook from "./components/Login/Facebook";

/* PRODUCENT */
import Profile from "./components/Producent/Profile";

const App = () => {
  const [user,setUser] = useState(null);
  const loggedIn = window.localStorage.getItem('isLoggedIn');
  console.log('local ' + loggedIn);
  console.log('user ' + user);

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
            <Route exact path="/logout" element={<Logout logout={() => setUser(null)}/>} />
          </>
        )}
        <Route exact path="*" element={<Navigate to={loggedIn ? "/home" : "/"} />} />

      </Routes>
    </div>
  );
}

export default App;
