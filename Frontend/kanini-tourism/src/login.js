
import React, { useState, useEffect } from 'react';
// Import your CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import jwt_decode from 'jwt-decode';
import './css//login.css'
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Signup from './signup';
const Login = () => {
  const navigate = useNavigate();
  const [loginusername, setLoginUsername] = useState('');
  const [loginpassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = sessionStorage.getItem('jwttoken');
    if (token) {
      const decodedToken = jwt_decode(token);
      const role =
        decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
      if (role === 'Traveler') {
        navigate('/Traveler');
      } else if (role === 'TravelAgent') {
        
        navigate('/TravelAgent');
      } else {
        navigate('/Admin');
      }
    }
  }, []);
  const handleSwitchMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  if (isLoginMode) {
    return <Signup />;
  }
 
  
  //console.log("agent details fetched",agent);
  const proceedLoginUsingAPI = (e) => {
    e.preventDefault();
    
    if (validate()) {
      let inpobj = {
        UserName: loginusername,
        password: loginpassword,
      };
      fetch('https://localhost:7023/api/Token', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(inpobj),
      })
        .then((res) => {
          
          return res.json();

        })
        .then((resp) => {
          
          if (Object.keys(resp).length === 0) {
            
            toast.error('Invalid Credentials. Please check Username and Password.');
          } else {
            localStorage.setItem('jwttoken', resp.token);
            //console.log(resp.token);
            const decodedToken = jwt_decode(resp.token);
            //console.log(decodedToken);
            const role =
              decodedToken[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
              ];
            const isApproved = decodedToken.IsApproved;

            //console.log(role);
            //console.log(isApproved);

            if (role === 'Administrator') {
              
              toast.success('Admin Logged In');
              navigate('/Admin');
            } else if (role === 'TravelAgent') {
              if (isApproved === 'Approved') {
                toast.success('Travel Agent Logged In');
                navigate('/TravelAgent');
              } else {
                localStorage.removeItem('jwttoken');
                toast.error('Your Account is not yet Approved');
                navigate('/Login');
              }
            } else {
              toast.success('Traveler Logged In');
              navigate('/TourDetails');
            }
          }
        })
        .catch((err) => {
          toast.error('Invalid Credentials \nPlease Check Username and Password');
        });
    }
  };

  const validate = () => {
    let result = true;
    if (loginusername === '' || loginusername === null) {
      result = false;
    }
    if (loginpassword === '' || loginpassword === null) {
      result = false;
    }
    return result;
  };

  return (
    <div className="container">
      <div className="container-wrapper">
        <h3 className="login-text">
          <i className="bi bi-person-circle ac-logo"></i>
          Login
        </h3>

        <form onSubmit={proceedLoginUsingAPI}>
          <div className="item">
            <input className="input" value={loginusername} onChange={(e) => setLoginUsername(e.target.value)} type="text" placeholder="Username" />
          </div>
          <div className="item">
            <input className="input" type={showPassword ? 'text' : 'password'} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" />
          </div>
          <div className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          <span className="remember">
            <a href="#">Forgot Password?</a>
          </span>

          <div className="item submit">
            <button type="submit">Submit</button>
          </div>
        </form>

        <h2>
          <span>OR</span>
        </h2>

        <div className="social-media">
          <a href="#">
            <div className="icons8-google social-mediaImg"></div>
          </a>
          <a href="#">
            <div className="icons8-facebook-circled social-mediaImg"></div>
          </a>
          <a href="#">
            <div className="icons8-twitter social-mediaImg"></div>
          </a>
        </div>
        <span className="ac" >
          Don't have an Account? <a href="#" onClick={handleSwitchMode}>Sign Up</a>
        </span>
      </div>
    </div>
  );
};

export default Login;

