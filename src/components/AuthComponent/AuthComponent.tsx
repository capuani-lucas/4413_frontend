import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

const AuthComponent: React.FunctionComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [])

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default AuthComponent;
