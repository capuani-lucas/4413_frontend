import React, { useState } from "react";
import './Signup.scss';
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useSignupMutation } from "service/userAPI";

const Signup: React.FunctionComponent = () => {

  const navigate = useNavigate();
  const [signup, signupResult] = useSignupMutation();
  const [login, loginResult] = useLoginMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSignup = () => {

    if (!username || !password) {
      return
    }

    signup({ username, password })
      .then((data: any) => {
        if (data.error) {
          setError(data.error.data.error);
          return;
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
      })
  }

  return (
    <div className="signup">
      <div className="signup__left">
        <div className="signup__left__con">
          <h1>Signup</h1>
          {
            error && <p className="signup__left__con__error">{error}</p>
          }
          <div className="signup__left__con__field">
            <p>Email</p>
            <input 
              type="text" 
              placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="signup__left__con__field">
            <p>Password</p>
            <input 
              type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}  
            />
          </div>
          <button
            className="signup__left__con__signup"
            type="submit"
            disabled={signupResult.isLoading || loginResult.isLoading}
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <button
            className="signup__left__con__login"
            type="submit"
            onClick={() => navigate('/login')}
            disabled={signupResult.isLoading || loginResult.isLoading}
          >
            Log in
          </button>
        </div>
      </div>
      <div className="signup__right"></div>
    </div>
  );
}

export default Signup;
