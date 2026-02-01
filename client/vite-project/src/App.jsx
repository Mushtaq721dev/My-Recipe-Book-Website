import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

// Import Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Page Components
import Home from './pages/Home';
import RecipeDetail from './pages/RecipedDetail';
import RecipeGrid from './pages/grid_layout';
import WhatsNew from './pages/WhatsNew';

// --- WRAPPERS FOR DYNAMIC PAGES ---

const RecipeDetailWrapper = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipe/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return <RecipeDetail recipe={recipe} />;
};

const CategoryWrapper = () => {
  const { name } = useParams();
  const [data, setData] = useState({ recipes: [], title: '', subtitle: '' });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/category/${name}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [name]);

  return <RecipeGrid recipes={data.recipes} title={data.title} subtitle={data.subtitle} />;
};

const WhatsNewWrapper = () => {
  const [data, setData] = useState({ featured: null, others: [] });

  useEffect(() => {
    axios.get('http://localhost:5000/api/whats-new')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return <WhatsNew featured={data.featured} others={data.others} />;
};

// --- NEW: SEARCH RESULTS WRAPPER ---
const SearchWrapper = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const location = useLocation();
  
  const query = new URLSearchParams(location.search).get("q") || "";
  const searchTerms = query.toLowerCase().trim().split(/\s+/); // Splits by any space

  useEffect(() => {
    // We fetch the full list from the updated /api/home route
    axios.get('http://localhost:5000/api/home')
      .then(res => setAllRecipes(res.data.menu))
      .catch(err => console.error("Search fetch error:", err));
  }, []);

  const filteredRecipes = allRecipes.filter(recipe => {
    // If search box is empty, show nothing or all (your choice)
    if (!query) return false;

    // A recipe matches if its title, category, OR badges contain ANY of the search terms
    return searchTerms.some(term => 
      recipe.title.toLowerCase().includes(term) ||
      recipe.category.toLowerCase().includes(term) ||
      (recipe.badges && recipe.badges.some(badge => badge.toLowerCase().includes(term)))
    );
  });

  return (
    <RecipeGrid 
      recipes={filteredRecipes} 
      title="Search Results" 
      subtitle={query ? `Found ${filteredRecipes.length} recipes for "${query}"` : "Try searching for ingredients or categories."} 
    />
  );
};

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1" style={{ marginTop: '80px' }}> {/* Added margin for fixed Navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetailWrapper />} />
            <Route path="/category/:name" element={<CategoryWrapper />} />
            <Route path="/whats-new" element={<WhatsNewWrapper />} />
            <Route path="/quick-picks" element={<CategoryWrapper />} />
            {/* NEW SEARCH ROUTE */}
            <Route path="/search" element={<SearchWrapper />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;