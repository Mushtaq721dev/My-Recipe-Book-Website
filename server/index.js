const path = require('path'); // ADD THIS
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors({
  origin: "https://mushtaq721dev.github.io" 
}));
app.use(express.json());

// FIXED: Use path.join and process.cwd() to find your data folder
const recipesPath = path.join(process.cwd(), 'data', 'recipes.json');
const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));

// ... (Keep your app.get routes exactly as they are) ...

app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    // FIXED: Use path.join here too
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
        console.error("Manual DB Write Error:", err);
        res.status(500).json({ message: "Server error saving subscription" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ADD THIS AT THE VERY BOTTOM
module.exports = app;