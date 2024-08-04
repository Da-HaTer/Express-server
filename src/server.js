// server.js
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./authRoutes');
const cors = require('cors'); // Import cors

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

app.use(cors({
  origin: 'http://localhost:4200', // Allow only requests from this origin
  methods: ['GET', 'POST'], // Allow only these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
}));
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use('/api/auth', authRoutes);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define a port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Adding Route
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]);
});