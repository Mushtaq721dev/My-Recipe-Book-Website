import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {

      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery(""); 
    }
  };

  return (
    <nav className="navbar navbar-glass navbar-coz navbar-expand-lg mb-4 fixed-top">
      <div className="container-fluid d-flex align-items-center">
        {/* Brand/Logo Section */}
        <Link className="navbar-brand" to="/">
          <img 
            src="/static/cropped_circle_image.png" 
            alt="MyRecipeBook Logo"
            height="50" 
            width="50" 
            className="d-inline-block ms-3" 
          />
          My Recipe Book
        </Link>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
            <li className="nav-item mx-1">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            
            <li className="nav-item mx-1">
              <Link className="nav-link fw-bold text-nowrap new" to="/whats-new" style={{ color: '#ae93ae' }}>
                What's New ✨
              </Link>
            </li>

            {/* Categories Dropdown */}
            <li className="nav-item dropdown mx-1">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </a>
              <ul className="dropdown-menu border-0 shadow-lg fade-down" style={{ backgroundColor: '#FFF5F7' }}>
                <li><Link className="dropdown-item" to="/category/Italian">Italian</Link></li>
                <li><Link className="dropdown-item" to="/category/Quick Snacks">Quick Snacks</Link></li>
                <li><Link className="dropdown-item" to="/category/Indian">Indian</Link></li>
                <li><Link className="dropdown-item" to="/category/Breakfast">Breakfast</Link></li>
                <li><Link className="dropdown-item" to="/category/Dessert">Dessert</Link></li>
                <li><Link className="dropdown-item" to="/category/Salad">Salad</Link></li>
                <li><Link className="dropdown-item" to="/category/Dinner">Dinner</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/category/Vegan">Vegan</Link></li>
                <li><Link className="dropdown-item" to="/category/Seafood">Seafood</Link></li>
                <li><Link className="dropdown-item" to="/category/Smoothies">Smoothies & Drinks</Link></li>
              </ul>
            </li>

            {/* Quick Picks Dropdown */}
            <li className="nav-item dropdown mx-1">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Quick Picks
              </a>
              <ul className="dropdown-menu border-0 shadow-lg fade-down" style={{ backgroundColor: '#FFF5F7' }}>
                <li><Link className="dropdown-item fw-bold" to="/quick-picks">🎲 Surprise Me (View All)</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/category/One Pot">One Pot</Link></li>
                <li><Link className="dropdown-item" to="/category/Slow Cooked">Slow Cooked</Link></li>
                <li><Link className="dropdown-item" to="/category/Stew">Stew Cooked</Link></li>
                <li><Link className="dropdown-item" to="/category/15 Minute Meals">15 Minute Meals</Link></li>
                <li><Link className="dropdown-item" to="/category/Budget Friendly">Budget Friendly</Link></li>
                <li><Link className="dropdown-item" to="/category/Kid Friendly">Kid Friendly</Link></li>
              </ul>
            </li>

            <li className="nav-item mx-1">
              <a className="nav-link" href="#whoWeAreCarousel">About Us</a>
            </li>
          </ul>
        </div>

        {/* --- ACTIVATED SEARCH BAR --- */}
        <form className="d-flex" role="search" onSubmit={handleSearch}>
          <input 
            className="me-2 search-cozy form-control" 
            type="search" 
            placeholder=" Let's Cook. . . ." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="butn me-3 px-3" type="submit">Go!</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;