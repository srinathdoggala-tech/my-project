// users.js
const bcrypt = require('bcryptjs');

// Mock database with hashed passwords
const users = [
  {
    id: 1,
    username: 'VIVEK YADAV',
    password: bcrypt.hashSync('VIVEK331', 10),
    role: 'admin'
  },
  {
    id: 2,
    username: 'VIVEK YADAV',
    password: bcrypt.hashSync('VIVEK331', 10),
    role: 'moderator'
  },
  {
    id: 3,
    username: 'VIVEK YADAV',
    password: bcrypt.hashSync('VIVEK331', 10),
    role: 'user'
  }
];

module.exports = users;
