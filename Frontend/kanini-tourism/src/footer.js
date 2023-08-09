import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <h4>MakeYourTrip</h4>
            <p>MakeYourTrip is a prominent tourism company offering comprehensive travel solutions. With a user-friendly platform, it empowers travelers to explore diverse destinations, book flights, hotels, and tour packages. Their expertise lies in providing personalized itineraries, ensuring unforgettable travel experiences, and simplifying the journey from planning to execution.</p>
          </div>
          <div className="col-md-3">
            <h4>Contact</h4>
            <ul className="list-unstyled">
              <li>Address: Malviya Nagar Jaipur,Rajathan</li>
              <li>Phone: 7976271478</li>
              <li>Email: prerit.web@gmail.com</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Follow Us</h4>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.facebook.com/prerit.khandelwal.39/" className="text-light" >
                  <FaFacebook className="mr-1" /> Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com/PreritWeb" className="text-light" >
                  <FaTwitter className="mr-1" /> Twitter
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/khandelwalprerit/" className="text-light" >
                  <FaInstagram className="mr-1" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/mrpreritkhandelwal/" className="text-light" >
                  <FaLinkedin className="mr-1" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
