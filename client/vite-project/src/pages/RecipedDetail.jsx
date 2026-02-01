import React from 'react';
import { Link } from 'react-router-dom';

const RecipeDetail = ({ recipe }) => {
  // If recipe data hasn't loaded yet, return null or a loading state
  if (!recipe) return <div className="container mt-5">Loading...</div>;

  return (
    <>
      {/* --- BREADCRUMB NAVIGATION --- */}
      <div className="container mt-5 pt-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" style={{ color: '#ae93ae', textDecoration: 'none' }}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="#" style={{ color: '#ae93ae', textDecoration: 'none' }}>Recipes</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page" style={{ color: '#4A3E4E' }}>
              {recipe.title}
            </li>
          </ol>
        </nav>
      </div>

      {/* --- HEADER SECTION (Image & Stats) --- */}
      <div className="container mb-5">
        <div className="row g-5 align-items-center">
          
          <div className="col-lg-6">
            <div className="position-relative">
              {/* Background shadow decoration */}
              <div 
                className="position-absolute top-0 start-0 w-100 h-100 bg-dark rounded-5" 
                style={{ transform: 'rotate(-2deg)', opacity: 0.1, zIndex: -1 }}
              ></div>
              <img 
                src={recipe.image_url} // Fixed: Matching the image_url key in your data
                alt={recipe.title} 
                className="img-fluid rounded-5 shadow w-100" 
                style={{ objectFit: 'cover', minHeight: '400px', maxHeight: '500px' }} 
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span 
                className="text-uppercase fw-bold badge px-3 py-2" 
                style={{ backgroundColor: '#e3c2e3', color: '#4A3E4E' }}
              >
                {recipe.category}
              </span>

              {/* Badges/Collections Loop */}
              {recipe.badges && recipe.badges.map((tag, index) => (
                <span 
                  key={index}
                  className="text-uppercase fw-bold badge px-3 py-2 border" 
                  style={{ backgroundColor: 'transparent', color: '#ae93ae', borderColor: '#ae93ae' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="display-4 fw-bold mb-3" style={{ color: '#4A3E4E' }}>{recipe.title}</h1>
            <p className="lead text-muted mb-4">{recipe.description}</p>

            {/* Preparation Stats */}
            <div 
              className="d-flex flex-wrap gap-4 mb-4 border-top border-bottom py-3" 
              style={{ borderColor: 'rgba(74, 62, 78, 0.1)' }}
            >
              <div className="d-flex align-items-center">
                <i className="bi bi-clock fs-4 me-2" style={{ color: '#ae93ae' }}></i>
                <div>
                  <small className="text-muted d-block text-uppercase" style={{ fontSize: '0.7rem' }}>Prep Time</small>
                  <span className="fw-bold" style={{ color: '#4A3E4E' }}>{recipe.prep_time}</span>
                </div>
              </div>
              <div className="d-flex align-items-center border-start ps-4">
                <i className="bi bi-fire fs-4 me-2" style={{ color: '#ae93ae' }}></i>
                <div>
                  <small className="text-muted d-block text-uppercase" style={{ fontSize: '0.7rem' }}>Cook Time</small>
                  <span className="fw-bold" style={{ color: '#4A3E4E' }}>{recipe.cook_time}</span>
                </div>
              </div>
              <div className="d-flex align-items-center border-start ps-4">
                <i className="bi bi-people-fill fs-4 me-2" style={{ color: '#ae93ae' }}></i>
                <div>
                  <small className="text-muted d-block text-uppercase" style={{ fontSize: '0.7rem' }}>Servings</small>
                  <span className="fw-bold" style={{ color: '#4A3E4E' }}>{recipe.servings}</span>
                </div>
              </div>
            </div>
            
            <div className="d-flex gap-2">
              <button className="btn no-print rounded-pill recipe-save-btn px-4 py-2 fw-bold text-white shadow-sm"  onClick={() => window.print()} style={{ backgroundColor: '#4A3E4E' }}>
                <i className="bi bi-printer me-2"></i> Print Recipe
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="container mx-auto my-5" style={{ borderTop: '1px solid #4A3E4E', opacity: 0.1 }} />

      {/* --- CONTENT SECTION (Ingredients & Instructions) --- */}
      <div className="container mb-5">
        <div className="row g-5">
          
          <div className="col-lg-4">
            <div className="p-4 rounded-4 bg-white shadow-sm sticky-top" style={{ top: '100px', zIndex: 1 }}>
              <h3 className="fw-bold mb-4" style={{ color: '#4A3E4E' }}>Ingredients</h3>
              <ul className="list-unstyled d-flex flex-column gap-3">
                {recipe.ingredients && recipe.ingredients.map((item, index) => (
                  <li className="d-flex align-items-start" key={index}>
                    <input 
                      className="form-check-input mt-1 me-3 p-2" 
                      type="checkbox" 
                      style={{ borderColor: '#ae93ae', cursor: 'pointer' }} 
                    />
                    <span className="fs-6">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-8">
            <h3 className="fw-bold mb-4" style={{ color: '#4A3E4E' }}>Instructions</h3>

            {/* Steps Loop */}
            {recipe.steps && recipe.steps.map((step, index) => (
              <div className="d-flex mb-5" key={index}>
                <div className="flex-shrink-0">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white fs-4 shadow-sm" 
                    style={{ width: '50px', height: '50px', backgroundColor: '#ae93ae' }}
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="flex-grow-1 ms-4">
                  <h5 className="fw-bold" style={{ color: '#4A3E4E' }}>{step.title}</h5>
                  <p className="text-muted fs-6" style={{ lineHeight: 1.7 }}>{step.text}</p>
                </div>
              </div>
            ))}

            <div className="mt-5 p-4 rounded-4 bg-light bg-opacity-50 border border-0">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-journal-text fs-3 me-3" style={{ color: '#4A3E4E' }}></i>
                <h4 className="fw-bold mb-0" style={{ color: '#4A3E4E' }}>Chef's Notes & Final Thoughts</h4>
              </div>
              <p className="text-muted" style={{ lineHeight: 1.8 }}>
                {recipe.explanation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;