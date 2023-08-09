import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  
  useEffect(() => {
    let token = localStorage.getItem('jwttoken');
    if (!token) {
      navigate('/login');
    } else {
      let decodedToken = decodeToken(token);
      let role = decodedToken.role;
      openComponentByRole(role);
    }
  }, [navigate]);

  const decodeToken = (token) => {
    const decodedToken = jwt_decode(token);
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    return { role };
  };

  const openComponentByRole = (role) => {
    switch (role) {
      case 'Administrator':
        navigate('/Admin');
        break;
      case 'Traveler':
        navigate('/Traveler');
        break;
      case 'TravelAgent':
        navigate('/TravelAgent');
        break;
      default:
        navigate('/SignUp');
        break;
    }
  };

  return <div>
    <Component />
  </div>;
}

export default Protected;
