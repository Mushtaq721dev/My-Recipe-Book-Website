const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Enable CORS so your React frontend can communicate with this server
app.use(cors());
app.use(express.json());

// Load your recipe data from the JSON file
const recipes = JSON.parse(fs.readFileSync('./data/recipes.json', 'utf8'));


// 1. HOME API: Returns latest, quick picks, and menu items
app.get('/api/home', (req, res) => {
    const latest = [...recipes].reverse().slice(0, 8);
    const quickPicks = [...recipes].sort(() => 0.5 - Math.random()).slice(0, 8);
    const menuItems = recipes;
    res.json({ latest, quick_picks: quickPicks, menu: menuItems });
});

// 2. SINGLE RECIPE: Finds a recipe by ID
app.get('/api/recipe/:id', (req, res) => {
    const recipe = recipes.find(r => r.id === parseInt(req.params.id));
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
});

// 3. CATEGORIES: Filters by category name OR badge
app.get('/api/category/:name', (req, res) => {
    const name = req.params.name;
    const filtered = recipes.filter(r => 
        r.category === name || (r.badges && r.badges.includes(name))
    );
    res.json({ 
        recipes: filtered, 
        title: name, 
        subtitle: `Explore our ${name} collection` 
    });
});

// 4. QUICK PICKS: Returns 12 random recipes
app.get('/api/quick-picks', (req, res) => {
    const randomRecipes = [...recipes].sort(() => 0.5 - Math.random()).slice(0, 12);
    res.json({ 
        recipes: randomRecipes, 
        title: "Quick Picks", 
        subtitle: "Can't decide? Let us choose for you." 
    });
});

// 5. WHAT'S NEW: Returns featured (newest) and others
app.get('/api/whats-new', (req, res) => {
    const newest = [...recipes].reverse().slice(0, 5);
    const featured = newest[0] || null;
    const others = newest.slice(1);
    res.json({ featured, others });
});


app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    const filePath = './data/subscribers.json'; 

    try {
        
        const rawData = fs.readFileSync(filePath, 'utf8');
        const subscribers = JSON.parse(rawData);

        
        if (subscribers.includes(email)) {
            return res.status(400).json({ message: "Email already subscribed!" });
        }

        
        subscribers.push(email);

        
        fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));

        
        res.json({ message: "Subscription request sent" });
    } catch (err) {
        console.error("Manual DB Write Error:", err);
        res.status(500).json({ message: "Server error saving subscription" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});