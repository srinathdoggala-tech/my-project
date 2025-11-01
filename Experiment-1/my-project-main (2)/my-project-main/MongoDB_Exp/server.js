// server.js
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todo')
const app = express();

app.use(express.json());

app.use('/', todoRoutes);

mongoose.connect('mongodb://localhost:27017/todoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
