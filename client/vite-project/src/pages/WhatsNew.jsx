import React from 'react';
import { Link } from 'react-router-dom';

const WhatsNew = ({ featured, others = [] }) => {
  // Guard clause to ensure we have data before rendering
  if (!featured) return null;

  return (
    <div className="container my-5 pt-5">
      {/* Featured Header Section - Replaces the top hero in whats_new.html */}
      <div 
        className="p-5 mb-5 bg-dark text-white rounded-5 position-relative overflow-hidden cd" 
        style={{ minHeight: '400px' }}
      >
        {/* Featured Image using dynamic image_url path */}
        <img 
          src={featured.image_url} 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            opacity: 0.4 
          }} 
          alt={featured.title}
        />
        
        <div className="position-relative z-1 d-flex flex-column justify-content-center h-100 px-lg-5">
          <span className="text-uppercase fw-bold text-warning mb-2">
            <i className="bi bi-stars"></i> Just Dropped
          </span>
          <h1 className="display-3 fw-bold">{featured.title}</h1>
          <p className="lead w-50">{featured.description}</p>
          <Link 
            to={`/recipe/${featured.id}`} 
            className="btn btn-warning btn-lg rounded-pill fw-bold px-5 mt-3 w-auto"
          >
            Try It First
          </Link>
        </div>
      </div>

      <h3 className="fw-bold mb-4 ps-2 border-start border-5 border-warning">
        Trending This Week
      </h3>
      
      {/* Trending List Section - Alternating rows logic preserved */}
      <div className="d-flex flex-column gap-5">
        {others.map((recipe, index) => (
          <div 
            key={recipe.id} 
            className={`row align-items-center g-5 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}
          >
            <div className="col-md-6">
              <div className="rounded-5 overflow-hidden shadow-lg" style={{ height: '300px' }}>
                <img 
                  src={recipe.image_url} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  alt={recipe.title} 
                />
              </div>
            </div>

            <div className="col-md-6">
              <span className="badge bg-warning text-dark mb-2">New Arrival</span>
              <h2 className="fw-bold">{recipe.title}</h2>
              <p className="text-muted lead">{recipe.description}</p>
              <div className="d-flex gap-3 mb-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-clock me-2"></i> {recipe.cook_time}
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-people me-2"></i> {recipe.servings}
                </div>
              </div>
              <Link to={`/recipe/${recipe.id}`} className="btn btn-dark rounded-pill px-4">
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsNew;