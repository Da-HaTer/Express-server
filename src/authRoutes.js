const express = require('express');
const router = express.Router();
const { registerUser, authenticateUser } = require('./auth');

// Register endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    await registerUser(username, password);
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authenticateUser(username, password);
    res.json({ token });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
