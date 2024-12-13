const { getUser } = require('../service/auth');

async function restrictToLoggedInUserOnly(req, res, next) {
   const userUid = req.cookies?.uid;
   if (!userUid) return res.status(401).redirect('/login');
   
   console.log('we are here')

   const user = getUser(userUid)
   if (!user) return res.status(401).redirect('/login');

   req.user = user;
   next();
}

module.exports = {
   restrictToLoggedInUserOnly,
}