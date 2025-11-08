// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const users = require('./users');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT Token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// Middleware: Verify Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({ message: 'Access denied: No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// Middleware: Role-based access
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
}

// Login route
app.post('/login', (req, res) => {
  const { username, password, role } = req.body;

  const user = users.find(
    (u) => u.username === username && u.role === role
  );

  if (!user) return res.status(400).json({ message: 'Invalid username or role' });

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: 'Invalid password' });

  const token = generateToken(user);
  res.json({ message: 'Login successful', token });
});

// Protected routes
app.get('/admin/dashboard', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.username}!` });
});

app.get('/moderator/manage', authenticateToken, authorizeRoles('moderator', 'admin'), (req, res) => {
  res.json({ message: `Welcome Moderator ${req.user.username}!` });
});

app.get('/user/profile', authenticateToken, authorizeRoles('user', 'moderator', 'admin'), (req, res) => {
  res.json({ message: `Welcome User ${req.user.username}!` });
});

// Default route
app.get('/', (req, res) => {
  res.send('RBAC System Running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
