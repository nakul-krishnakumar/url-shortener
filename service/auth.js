const jwt = require('jsonwebtoken');
const secret = 'Nakul@123';

function setUser(user) {
   return jwt.sign(user, secret);
}

function getUser(token) {
   if (!token) return null;
   return jwt.verify(token, secret);
}

module.exports = {
   setUser,
   getUser
}