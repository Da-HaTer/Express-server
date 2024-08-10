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
    // throw new Error('User registration failed');
    throw err;
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
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return token;
  } catch (err) {
    console.log(err);
    // throw new Error('Authentication failed');
    throw err;
  }
}

function authenticateToken(req, res, next) {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  token=req.body.token;
  if (token == null) return res.sendStatus(401);   
 // Unauthorized

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;   

    next();
  });
}

module.exports = { registerUser, authenticateUser, authenticateToken };
