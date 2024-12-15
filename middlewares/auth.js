const { getUser } = require('../service/auth');

async function restrictToLoggedInUserOnly(req, res, next) {
   const token = req.cookies?.token;
   if (!token) return res.status(401).redirect('/signup');

   const user = getUser(token);

   if (!user) return res.status(401).redirect('/signup');

   req.user = user;
   next();
}

async function checkAuth(req, res, next) {
   const token = req.cookies?.token;
   const user = getUser(token);

   req.user = user;
   next();
}

module.exports = {
   restrictToLoggedInUserOnly,
   checkAuth
}