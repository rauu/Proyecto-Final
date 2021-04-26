import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import NavPrivate from "../nav-private/Nav-Private";

import SideMenu from "../sideMenu/SideMenu"

const Dashboard = () => {
  useEffect(() => {
    if (sessionStorage.getItem("user") === null) {
      history.push("/login");
    } else {
      setLoggedIn(true);
    }
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="dashboard">
      {loggedIn && (
        <>
          {/* <NavPrivate></NavPrivate> */}
          <SideMenu></SideMenu>
          <h1> WELCOME AGAIN {user.name}!!!</h1>
        </>
      )}
    </div>
  );
};

export default Dashboard;
