import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState({ 
    latest: [], 
    quick_picks: [], 
    menu: [] 
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/home')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="d-block">
      {/* --- HERO CAROUSEL SECTION --- */}
      <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '40px' }}>
        <div className="text-end d-none d-md-block ps-1">
          <button className="arrow_btn rounded-3 shadow p-3" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="fw-medium">&lt;</span>
          </button>
        </div>

        <div className="card cd text-bg-dark rounded-5 border-0 align-items-center justify-content-center mx-2 overflow-hidden">
          <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" style={{ width: '100%' }}>
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" style={{ backgroundColor: '#c4a4c4' }}></button>
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" style={{ backgroundColor: '#c4a4c4' }}></button>
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" style={{ backgroundColor: '#c4a4c4' }}></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="hero-slide-content rounded-5 overflow-hidden position-relative">
                  <div className="cd">
                    <img src="/static/home.jpg" alt="Home Banner" className="card-img rounded-5 border-0" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="word-up card-img-overlay bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center font-sans-serif rounded-5">
                    <h1 className="display-5 fw-semibold">Cook. Taste. Repeat.</h1>
                    <p className="fw-semibold">Bringing the world to your kitchen, one plate at a time.</p>
                  </div>
                </div>
              </div>

              <div className="carousel-item">
                <div className="hero-slide-content rounded-5 overflow-hidden position-relative">
                  <div className="cd">
                    <img src="/static/3.jpg" className="card-img rounded-5 border-0" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Home Banner" />
                  </div>
                  <div className="word-up card-img-overlay bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center font-sans-serif rounded-5">
                    <h1 className="display-5 fw-semibold text-center">75 Recipes. Infinite Flavors.</h1>
                    <p className="fw-semibold">Discover our ever-growing collection of global favorites.</p>
                  </div>
                </div>
              </div>

              <div className="carousel-item">
                <div className="hero-slide-content rounded-5 overflow-hidden position-relative">
                  <div className="cd">
                    <img src="/static/food.jpg" className="card-img rounded-5 border-0" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Discover More" />
                  </div>
                  <div className="word-up card-img-overlay bg-dark bg-opacity-60 d-flex flex-column justify-content-center align-items-center font-sans-serif rounded-5">
                    <h1 className="display-5 fw-semibold">Your Next Favorite Meal</h1>
                    <p className="fw-semibold px-3 text-center">Explore our curated menu designed for every occasion.</p>
                    <a href="#menuCarousel" className="btn px-4 py-2 mt-3 fw-bold shadow-sm border-0" style={{ backgroundColor: '#ae93ae', color: '#4A3E4E', borderRadius: '12px' }}>
                      Start Cooking →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-start d-none d-md-block pe-1">
          <button className="arrow_btn rounded-3 shadow p-3" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="fw-medium">&gt;</span>
          </button>
        </div>
      </div>

      <br />
      <div style={{ borderTop: 'solid .5px #4A3E4E', width: '60%', marginLeft: '18%' }}></div>

      {/* --- MENU CAROUSEL SECTION --- */}
      <h3 id="menuCarouselTitle" className="mx-3 my-3 fw-semibold" style={{ color: '#4A3E4E' }}>Our Menu:</h3>
      <div className="position-relative" style={{ marginTop: '25px' }}>
        <div id="menuCarousel" className="carousel slide" data-bs-interval="false">
          <div className="carousel-inner">
            {Array.from({ length: Math.ceil(data.menu.length / 6) }).map((_, slideIndex) => (
              <div className={`carousel-item ${slideIndex === 0 ? 'active' : ''}`} key={slideIndex}>
                <div className="row row-cols-md-3 row-cols-1 g-4 me-3 ms-3">
                  {data.menu.slice(slideIndex * 6, (slideIndex * 6) + 6).map((recipe) => (
                    <div className="col" key={recipe.id}>
                      <Link to={`/recipe/${recipe.id}`} className="recipe-card text-decoration-none text-reset">
                        <div className='recipe-card'>
                        <div className="position-relative">
                          <img 
                            src={recipe.image_url} 
                            alt={recipe.title} 
                            style={{ height: '220px', objectFit: 'cover', width: '100%', borderRadius: '15px 15px 0 0' }} 
                          />
                          <span className="category-badge">{recipe.category}</span>
                        </div>
                        <div className="card-title p-3">
                          <p className="fw-bold mb-0">{recipe.title}</p>
                        </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="arrow_btn position-absolute top-50 start-0 translate-middle-y ms-1 shadow p-2 rounded-3 border-0" type="button" data-bs-target="#menuCarousel" data-bs-slide="prev" style={{ zIndex: 5 }}>
          <span className="fw-medium">&lt;</span>
        </button>
        <button className="arrow_btn position-absolute top-50 end-0 translate-middle-y me-1 shadow p-2 rounded-3 border-0" type="button" data-bs-target="#menuCarousel" data-bs-slide="next" style={{ zIndex: 5 }}>
          <span className="fw-medium">&gt;</span>
        </button>
      </div>

      {/* --- LATEST RECIPES SECTION --- */}
      <div className="container-fluid p-4 rounded-4 mt-5" style={{ backgroundColor: '#4A3E4E' }}>
        <h3 className="mx-3 mb-4 fw-semibold" style={{ color: '#FFF5F7' }}>Try Our Latest Recipe's:</h3>
        <div className="row g-3 align-items-stretch">
          {data.latest.slice(0, 1).map((recipe) => (
            <div className="col-md-6" key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`} className="card border-0 rounded-5 overflow-hidden h-100 position-relative cd lat-rep text-decoration-none recipe-card">
                <img src={recipe.image_url} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={recipe.title} />
                <span className="category-badge" style={{ top: '20px', bottom: 'auto', left: '20px' }}>Special</span>
                <div className="card-img-overlay d-flex flex-column justify-content-end align-items-start p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                  <div className="word-up">
                    <p className="fw-semibold fs-3 mb-0 ">{recipe.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <div className="col-md-6">
            <div className="row g-3 h-100">
              {data.latest.slice(1, 5).map((recipe) => (
                <div className="col-6" key={recipe.id}>
                  <Link to={`/recipe/${recipe.id}`} className="card border-0 rounded-4 overflow-hidden h-100 text-white position-relative recipe-card text-decoration-none">
                    <img src={recipe.image_url} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={recipe.title} />
                    <span className="category-badge" style={{ top: '10px', bottom: 'auto', left: '10px' }}>{recipe.category}</span>
                    <div className="word-up card-img-overlay d-flex flex-column justify-content-end align-items-start p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                      <p className="fw-semibold small mb-0 ">{recipe.title}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- RANDOM QUICK PICKS SECTION --- */}
      <div className="container mt-5 mb-3 position-relative">
        <h3 className="fw-bold mb-4" style={{ color: '#4A3E4E' }}>Random Quick Picks</h3>
        <div id="quickPicksCarousel" className="carousel slide" data-bs-ride="false">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row g-4">
                {data.quick_picks.slice(0, 4).map((recipe) => (
                  <div className="col-12 col-md-6 col-lg-3" key={recipe.id}>
                    <div className="rail-card h-100 position-relative pb-3">
                      <div className="position-relative mb-3">
                        <img src={recipe.image_url} alt={recipe.title} className="rounded-3 w-100" style={{ height: '250px', objectFit: 'cover' }} />
                        <span className="category-badge">{recipe.category}</span>
                      </div>
                      <div className="mt-3 px-2">
                        <div className="d-flex align-items-center text-muted small mb-2 gap-3" style={{ fontSize: '0.85rem' }}>
                          <span className="d-flex align-items-center"><i className="bi bi-clock me-1" style={{ color: '#ae93ae' }}></i> {recipe.prep_time}</span>
                          <span className="d-flex align-items-center"><i className="bi bi-people me-1" style={{ color: '#ae93ae' }}></i> {recipe.servings}</span>
                        </div>
                        <h5 className="fs-5 fw-bold mb-0" style={{ color: '#4A3E4E' }}>{recipe.title}</h5>
                      </div>
                      <Link to={`/recipe/${recipe.id}`} className="stretched-link"></Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Added back Slide 2 */}
            <div className="carousel-item">
              <div className="row g-4">
                {data.quick_picks.slice(4, 8).map((recipe) => (
                  <div className="col-12 col-md-6 col-lg-3" key={recipe.id}>
                    <div className="rail-card h-100 position-relative pb-3">
                      <div className="position-relative mb-3">
                        <img src={recipe.image_url} alt={recipe.title} className="rounded-3 w-100" style={{ height: '250px', objectFit: 'cover' }} />
                        <span className="category-badge">{recipe.category}</span>
                      </div>
                      <div className="mt-3 px-2">
                        <div className="d-flex align-items-center text-muted small mb-2 gap-3" style={{ fontSize: '0.85rem' }}>
                          <span className="d-flex align-items-center"><i className="bi bi-clock me-1" style={{ color: '#ae93ae' }}></i> {recipe.prep_time}</span>
                          <span className="d-flex align-items-center"><i className="bi bi-people me-1" style={{ color: '#ae93ae' }}></i> {recipe.servings}</span>
                        </div>
                        <h5 className="fs-5 fw-bold mb-0" style={{ color: '#4A3E4E' }}>{recipe.title}</h5>
                      </div>
                      <Link to={`/recipe/${recipe.id}`} className="stretched-link"></Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Added back the side buttons */}
          <button className="rail-arrow-btn start-0" type="button" data-bs-target="#quickPicksCarousel" data-bs-slide="prev">
            <span>&lt;</span>
          </button>
          <button className="rail-arrow-btn end-0" type="button" data-bs-target="#quickPicksCarousel" data-bs-slide="next">
            <span>&gt;</span>
          </button>
        </div>
      </div>

      <hr className="mx-auto" style={{ borderTop: '0.5px solid #4A3E4E', width: '60%', opacity: 1, marginBottom: '2rem', marginTop: '2rem' }} />

      {/* --- WHO WE ARE SECTION --- */}
      <div className="container mt-0 mb-5">
        <div className="row align-items-center gx-5">
          <div className="col-md-6">
            <div className="position-relative cd">
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark rounded-5" style={{ transform: 'rotate(-3deg)', opacity: 0.1, zIndex: -1 }}></div>
              <img src="https://images.unsplash.com/photo-1629407119384-d42320c3e576" alt="Our Kitchen" className="img-fluid rounded-5 shadow-lg w-100" style={{ objectFit: 'cover', minHeight: '400px' }} />
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <div id="whoWeAreCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators justify-content-start ms-0" style={{ bottom: '-50px' }}>
                <button type="button" data-bs-target="#whoWeAreCarousel" data-bs-slide-to="0" className="active bg-dark"></button>
                <button type="button" data-bs-target="#whoWeAreCarousel" data-bs-slide-to="1" className="bg-dark"></button>
                <button type="button" data-bs-target="#whoWeAreCarousel" data-bs-slide-to="2" className="bg-dark"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active" style={{ minHeight: 'auto', height: 'auto' }}>
                  <span className="text-uppercase fw-bold" style={{ color: '#ae93ae', letterSpacing: '2px' }}>Our Story</span>
                  <h2 className="display-5 fw-bold mt-2 mb-4" style={{ color: '#4A3E4E' }}>Who Are We?</h2>
                  <p className="lead text-muted mb-4">We are a group of home cooks, professional chefs, and food lovers who believe that the best memories are made around the table.</p>
                </div>
                <div className="carousel-item" style={{ minHeight: 'auto', height: 'auto' }}>
                  <span className="text-uppercase fw-bold" style={{ color: '#ae93ae', letterSpacing: '2px' }}>Curated For You</span>
                  <h2 className="display-5 fw-bold mt-2 mb-4" style={{ color: '#4A3E4E' }}>Recipes You'll Love</h2>
                  <p className="lead text-muted mb-4">We test every single dish in our own kitchens first to ensure quality.</p>
                  <button className="btn btn-dark rounded-pill px-4 py-2 mt-3">Browse Collections</button>
                </div>
                <div className="carousel-item" style={{ minHeight: 'auto', height: 'auto' }}>
                  <span className="text-uppercase fw-bold" style={{ color: '#ae93ae', letterSpacing: '2px' }}>Community</span>
                  <h2 className="display-5 fw-bold mt-2 mb-4" style={{ color: '#4A3E4E' }}>Join the Family</h2>
                  <p className="lead text-muted mb-4">Cooking is better when we do it together. Join over 10,000 foodies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;