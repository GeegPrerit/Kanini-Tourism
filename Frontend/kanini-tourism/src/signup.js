import React, { useState } from 'react';
import Login from './login';
import './css/signup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    console.log(role)
    event.preventDefault();
    if (role === 'Admin') {
      if (username && email && password && role) {
        try {
          const response = await fetch('https://localhost:7023/api/Admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              email,
              password,
            }),
          });


          if (response.ok) {
            const data = await response.json();
            console.log('Response:', data);
            toast.success("Admin registered successfully")


            setUsername('');
            setEmail('');
            setPassword('');
            setRole('');
            setIsLoginMode(true);
            


            //fetchUsers(); // Refresh the user list after successful signup
          } else {
            console.log('Error:', response.status);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    } else if (role === 'Travel Agent') {
      if (username && email && password ) {
        try {
          const response = await fetch('https://localhost:7023/api/TravelAgent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              email,
              password,
              isApproved:"Not Approved"
            }),
          });


          if (response.ok) {
            const data = await response.json();
            console.log('Response:', data);
            toast.success("Travel Agent registered successfully")



            setUsername('');
            setEmail('');
            setPassword('');
            setRole('');
            setIsLoginMode(true);


            //fetchUsers(); // Refresh the user list after successful signup
          } else {
            console.log('Error:', response.status);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    } else {
      if (username && email && password && role) {
        try {
          const response = await fetch('https://localhost:7023/api/Traveler', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              email,
              password,
            }),
          });


          if (response.ok) {
            const data = await response.json();
            console.log('Response:', data);
            toast.success("Traveler registered successfully")


            setUsername('');
            setEmail('');
            setPassword('');
            setRole('');
            setIsLoginMode(true);
            


            //fetchUsers(); // Refresh the user list after successful signup
          } else {
            console.log('Error:', response.status);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    }


  };


  const handleSwitchMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  if (isLoginMode) {
    return <Login />;
  }



  return (
    <>
      <div className="container">
        <div className="container-wrapper">
          <h3 className="login-text">
            <i className="bi bi-person-circle ac-logo"></i>
            Signup
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="item">
              <input className="input" value={username} onChange={handleUsernameChange} type="text" placeholder="Username" />
            </div>
            <div className="item">
              <input className="input" type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
            </div>
            <div className="item">
              <input type="email" className="input" value={email} onChange={handleEmailChange} name="email" placeholder="Email" required />
            </div>
            <select className="input" onChange={handleRoleChange} >
              <option value="" disabled selected>Select User Type</option>
              <option value="Traveler">Traveler</option>
              <option value="Travel Agent">Travel Agent</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="item submit">
              <button type="submit">SignUp</button>
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
            Already have an Account? <a href="#" onClick={handleSwitchMode}>Login</a>

          </span>
        </div>
      </div>
      

    </>

  );
}
export default Signup