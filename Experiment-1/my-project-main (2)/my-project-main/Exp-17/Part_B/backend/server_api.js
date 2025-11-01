const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors(
    {"origin": "http://localhost:5173"}
));

// Dummy API endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend! Kartik' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});