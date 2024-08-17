import React from "react";
import "./NavBar.scss";

import { logout } from "service/utils";
import { Link } from "react-router-dom";

const routes = [
  {
    path: "/",
    name: "Catalog",
  },
  {
    path: "/cart",
    name: "Cart",
  },
  {
    path: "/profile",
    name: "Profile",
  }
]

const NavBar: React.FunctionComponent = () => {

  return (
    <nav className="nav">
      <div className="nav__left">
        <h1>4413 Project</h1>
      </div>
      <div className="nav__center">
        {routes.map((route) => (
          <Link 
            to={route.path} 
            key={route.path}
            className={window.location.pathname === route.path ? 'nav__center__active' : ''}
          >
            {route.name}
          </Link>
        ))}
      </div>
      <button
        className="nav__logout"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;