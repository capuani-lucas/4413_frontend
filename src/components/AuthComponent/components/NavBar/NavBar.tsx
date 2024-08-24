import React from "react";
import "./NavBar.scss";

import { logout } from "service/utils";
import { Link } from "react-router-dom";
import CartOverview from "./components/CartOverview/CartOverview";
import { BASE_URL } from "config";

const routes = [
  {
    path: "/",
    name: "Catalog",
  },
  {
    path: "/orders",
    name: "Orders",
  }
]

const NavBar: React.FunctionComponent = () => {

  return (
    <nav className="nav">
      <div className="nav__left">
        <h1>4413 E-commerce Project</h1>
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
      <div className="nav__right">
        <CartOverview />
        <a
          href={`${BASE_URL}/admin`}
          target="_blank"
          rel="noreferrer"
          className="nav__admin"
        >
          Admin
        </a>
        <button
          className="nav__logout"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
