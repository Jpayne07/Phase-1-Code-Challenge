const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Read the JSON file
const data = JSON.parse(fs.readFileSync('final_fantasy.json', 'utf8'));

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// New endpoint for entries
app.get('/entries', (req, res) => {
  res.json(data.entries);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
