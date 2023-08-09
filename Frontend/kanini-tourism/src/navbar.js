import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'; // Step 1: Import NavDropdown
import './css/navbar.css';
import logo from './img/logo.png'
import jwt_decode from 'jwt-decode';

function CustomNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({ name: '', role: '', IsApproved: '' });

  // Step 2: Add the 'expanded' state
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('jwttoken');
    const decodedToken = decodeToken(token);
    setUserInfo(decodedToken);

    if (decodedToken.role === 'TravelAgent' && decodedToken.IsApproved === 'Approved') {
      // Agent is logged in but not approved
      localStorage.removeItem('jwttoken');
      setIsLoggedIn(false);
    } else {
      // Agent is approved or non-agent user
      setIsLoggedIn(!!token);
    }
  }, [location, updateFlag]);

  const decodeToken = (token) => {
    try {
      const decodedToken = jwt_decode(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const name = decodedToken['http://schemas.microsoft.com/ws/2005/05/identity/claims/UserName'];
      return { name, role };
    } catch (error) {
      console.error('Error decoding token:', error);
      return { name: '', role: '' };
    }
  };

  const handleLogout = () => {

    localStorage.removeItem('jwttoken');
    setIsLoggedIn(false);
    setUpdateFlag((prevFlag) => !prevFlag);

  };

  return (
    <Navbar expand="lg" className="custom-navbar" expanded={expanded}>
      <Navbar.Brand as={Link} to="/">
        <img id="logo" src={logo} className="card-img-top-left" alt="Hospital Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            <b>Home</b>
          </Nav.Link>
          <Nav.Link as={Link} to="/AboutUs">
            <b>About Us</b>
          </Nav.Link>
          <Nav.Link as={Link} to="/ContactUs">
            <b>Contact Us</b>
          </Nav.Link>
          <Nav.Link as={Link} to="/TourDetails">
            <b>Tour Details</b>
          </Nav.Link>
          <Nav.Link as={Link} to="/Gallery">
            <b>Gallery</b>
          </Nav.Link>
          
        </Nav>

        <Nav>
          <NavDropdown title={<i className="fas fa-user-circle" style={{ fontSize: '1.5rem', marginRight: '25px' }}></i>} id="basic-nav-dropdown">
            {isLoggedIn && userInfo.role === 'TravelAgent' && (
              <NavDropdown.Item as={Link} to="/TravelAgent">
                <b>Travel Agent</b>
              </NavDropdown.Item>
            )}
            {isLoggedIn && userInfo.role === 'Traveler' && (
              <NavDropdown.Item as={Link} to="/Traveler">
                Traveler
              </NavDropdown.Item>
            )}
            {isLoggedIn && userInfo.role === 'Administrator' && (
              <NavDropdown.Item as={Link} to="/Admin">
                Admin
              </NavDropdown.Item>
            )}
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={isLoggedIn ? '/login' : '/login'} onClick={handleLogout}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;


