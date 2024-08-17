import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer />
    </div>
  );
}

export default AuthComponent;
