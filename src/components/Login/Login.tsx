import React, { useState } from "react";
import './Login.scss';
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "service/userAPI";

const Login: React.FunctionComponent = () => {

  const navigate = useNavigate();
  const [login, loginResult] = useLoginMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      return
    }
    login({ username, password })
      .then((data: any) => {
        if (data.error) {
          setError(data.error.data.error.detail);
          return;
        }
        localStorage.setItem('token', data.data.access);
        navigate('/');
      })
  }

  return (
    <div className="login">
      <div className="login__left">
        <div className="login__left__con">
          <h1>Login</h1>
          {
            error && <p className="login__left__con__error">{error}</p>
          }
          <div className="login__left__con__field">
            <p>Username</p>
            <input 
              type="text" 
              placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="login__left__con__field">
            <p>Password</p>
            <input 
              type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            className="login__left__con__login"
            type="submit"
            onClick={handleLogin}
            disabled={loginResult.isLoading}
          >
            Login
          </button>
          <button
            className="login__left__con__register"
            type="submit"
            onClick={() => navigate('/signup')}
            disabled={loginResult.isLoading}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="login__right"></div>
    </div>
  );
}

export default Login;
