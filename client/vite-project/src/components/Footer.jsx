import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
  
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:5000/api/subscribe', { email });
      
      
      setStatusMessage(response.data.message); 
      setEmail(''); // Clear the input field
    } catch (err) {
      setStatusMessage(err.response?.data?.message || "Error subscribing.");
    }
  };

  return (
    <footer className="border-top py-4 mt-auto text-white" style={{ backgroundColor: 'rgb(75, 63, 78)' }}>
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex">
          <img 
            src="/static/cropped_circle_image.png" 
            alt="Logo" 
            height="50" 
            width="50" 
            className="d-inline-block" 
          />
          <div>
            <h4 className="fw-bold px-2"> My Recipe Book</h4>
            <p className="px-2" style={{ color: '#EAD8D8' }}>Recipes that feel like home.</p>
          </div>
        </div>

        <div>
          <h5 className="fw-semibold">Quick Links</h5>
          <ul className="navbar-nav footer-bar">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/">Recipes</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/">Our Chefs</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="fw-semibold">Social</h5>
          <ul className="navbar-nav footer-bar">
            <li className="nav-item"><a className="nav-link" href="/">Instagram</a></li>
            <li className="nav-item"><a className="nav-link" href="/">Linkedin</a></li>
            <li className="nav-item"><a className="nav-link" href="/">Facebook</a></li>
            <li className="nav-item"><a className="nav-link" href="/">X</a></li>
          </ul>
        </div>

        <div className="footer-ed px-5">
          <h5 className="me-5 fw-semibold">Subscribe</h5><br />
          <p className="footer-bar">Get your daily recipes delivered <br />in your inbox!<br /></p>
          
          
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input 
                className="form-control email-form" 
                type="email" 
                placeholder="  Your Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="btn btn-primary" type="submit">Go!</button>
            </div>
          </form>

          
          {statusMessage && (
            <p className="small fw-bold" style={{ color: '#EAD8D8', marginTop: '-10px' }}>
              {statusMessage}
            </p>
          )}
        </div>
      </div>

      <div className="text-center copy-text">
        &copy; My Recipe Book. All Rights Reserved 2025
      </div>
    </footer>
  );
};

export default Footer;