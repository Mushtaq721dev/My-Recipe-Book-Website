const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000; 

// 1. Enable CORS for your GitHub Pages frontend
app.use(cors({
    origin: "https://mushtaq721dev.github.io" 
}));
app.use(express.json());

// 2. Load Data using Absolute Paths (Crucial for Vercel)
const recipesPath = path.join(process.cwd(), 'data', 'recipes.json');
const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));

// 3. API Routes
app.get('/api/home', (req, res) => {
    const latest = [...recipes].reverse().slice(0, 8);
    const quickPicks = [...recipes].sort(() => 0.5 - Math.random()).slice(0, 8);
    const menuItems = recipes;
    res.json({ latest, quick_picks: quickPicks, menu: menuItems });
});

app.get('/api/recipe/:id', (req, res) => {
    const recipe = recipes.find(r => r.id === parseInt(req.params.id));
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
});

app.get('/api/category/:name', (req, res) => {
    const name = req.params.name;
    const filtered = recipes.filter(r => 
        r.category === name || (r.badges && r.badges.includes(name))
    );
    res.json({ recipes: filtered, title: name, subtitle: `Explore our ${name} collection` });
});

app.get('/api/quick-picks', (req, res) => {
    const randomRecipes = [...recipes].sort(() => 0.5 - Math.random()).slice(0, 12);
    res.json({ recipes: randomRecipes, title: "Quick Picks", subtitle: "Can't decide?" });
});

app.get('/api/whats-new', (req, res) => {
    const newest = [...recipes].reverse().slice(0, 5);
    const featured = newest[0] || null;
    const others = newest.slice(1);
    res.json({ featured, others });
});

// 4. Subscription Route
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    const filePath = path.join(process.cwd(), 'data', 'subscribers.json'); 
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
        console.error("Database Write Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// 5. Start Server & Export for Vercel
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;