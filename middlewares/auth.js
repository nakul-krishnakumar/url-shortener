const { getUser } = require('../service/auth');

async function restrictToLoggedInUserOnly(req, res, next) {
   const token = req.cookies?.uid;
   if (!token) return res.status(401).redirect('/login');

   const user = getUser(token);
   console.log(user);
   if (!user) return res.status(401).redirect('/login');

   req.user = user;
   next();
}

async function checkAuth(req, res, next) {
   const token = req.cookies?.uid;

   const user = getUser(token);

   req.user = user;
   next();
}

module.exports = {
   restrictToLoggedInUserOnly,
   checkAuth
}