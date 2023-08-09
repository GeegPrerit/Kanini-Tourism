import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eemail, setEemail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successNewsletterMessage, setNewsletterSuccessMessage] = useState('');
  const [errorNewsletterMessage, setNewsletterErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_jdxsk2a",
        "template_vj08dah",
        form.current,
        "Z4YOXgov-cwzz_Zeo"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log(name,email,message);
          setSuccessMessage("Message sent successfully");
        },
        (error) => {
          console.log(error.text);
          setErrorMessage("There was an error sending the message",error);
        }
      );
  };


  return (
    <div className="container">
      <h1>Contact Us</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2>Contact Information</h2>
              <p><i className="fas fa-envelope"></i> Email: info@example.com</p>
              <p><i className="fas fa-phone"></i> Phone: +1 123-456-7890</p>
              <p><i className="fas fa-map-marker-alt"></i> Address: 123 Main St, City, State, Country</p>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-body">
              <h2>Business Hours</h2>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h2>Leave us a Message</h2>
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form ref={form} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="user_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="user_email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    value={message}
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2>Follow Us</h2>
              <div className="social-media">
                <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div className="card mt-4">
        <div className="card-body">
          <h2>Subscribe to Our Newsletter</h2>
          {successNewsletterMessage && <div className="alert alert-success">{successNewsletterMessage}</div>}
          {errorNewsletterMessage && <div className="alert alert-danger">{errorNewsletterMessage}</div>}
          <form ref={form} >
            <div className="mb-3">
              <input
                type="email"
                name="user_mail"
                className="form-control"
                placeholder="Enter your email"
                value={eemail}
                onChange={(e) => setEemail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </div>
          <div className="card mt-4">
            <div className="card-body">
              <h2>Get Directions</h2>
              <div className="map-container">
                <iframe
                  title="Hospital Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.129732294308!2d-122.08407408484035!3d37.42200317982866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e9aa7f8b17b%3A0x70597ae3c74192a9!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1627674450371!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
