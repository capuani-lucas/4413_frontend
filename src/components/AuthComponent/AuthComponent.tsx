import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Intercom from '@intercom/messenger-js-sdk';

const AuthComponent: React.FunctionComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [])

  Intercom({
    app_id: 'p7i8x559',
  });

  return (
    <div>
      <NavBar />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default AuthComponent;
