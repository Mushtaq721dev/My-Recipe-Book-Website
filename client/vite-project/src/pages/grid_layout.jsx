import React from 'react';
import { Link } from 'react-router-dom';

const RecipeGrid = ({ recipes, title, subtitle }) => {
  return (
    <div className="container my-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-dark">{title}</h1>
        <p className="lead text-muted">{subtitle}</p>
        <hr className="w-25 mx-auto text-primary" style={{ opacity: 1 }} />
      </div>

      {/* Grid Section - This is where the {% for %} loop lived */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {recipes.map((recipe) => (
          <div className="col" key={recipe.id}>
            {/* The <a> tag becomes <Link> for faster React navigation */}
            <Link 
              to={`/recipe/${recipe.id}`} 
              className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden text-decoration-none text-reset transition-hover cd"
            >
              <div style={{ height: '250px', overflow: 'hidden' }}>
                <img 
                  src={recipe.image_url} 
                  className="card-img-top" 
                  alt={recipe.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              
              <div className="card-body d-flex flex-column">
                <div className="mb-2">
                  <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill me-1">
                    {recipe.category}
                  </span>
                  <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill">
                    <i className="bi bi-clock"></i> {recipe.prep_time}
                  </span>
                </div>
                
                <h5 className="card-title fw-bold text-dark">{recipe.title}</h5>
                <p className="card-text text-muted small flex-grow-1">
                  {recipe.description.substring(0, 80)}...
                </p>
                
                <div className="btn btn-outline-dark mt-auto rounded-pill w-100">View Recipe</div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Inline Styles are now written as CSS in JS or moved to your index.css */}
      <style>
        {`
          .transition-hover {
            transition: transform 0.2s;
          }
          .transition-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
          }
        `}
      </style>
    </div>
  );
};

export default RecipeGrid;