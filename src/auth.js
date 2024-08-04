const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');

// Secret key for JWT
const SECRET_KEY = process.env.SECRET_KEY;

// Register user
async function registerUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const [result] = await pool.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    return result.insertId;
  } catch (err) {
    console.log(err);
    throw new Error('User registration failed');
  }
}

// Authenticate user
async function authenticateUser(username, password) {
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) throw new Error('Invalid credentials');

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error('Invalid credentials');

    // Generate JWT
    console.log(SECRET_KEY);

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return token;
  } catch (err) {
    console.log(err);
    throw new Error('Authentication failed');
  }
}

module.exports = { registerUser, authenticateUser };
