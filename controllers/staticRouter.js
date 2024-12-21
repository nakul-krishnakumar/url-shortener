const URL = require('../models/URL');

async function redirectToUserHome(req, res) {
   if (!req.user) return res.redirect('/signup');
   try {
      const URLs = await URL.find({ createdBy: req.user._id,});
      return res.render("home", {
         name: req.user.name,
         URLs: URLs,
      });
   } catch (err) {
      console.error(err);
   }
}

async function redirectToSignUp(req, res) {
   return res.render('signup');
}

async function redirectToLogIn(req, res) {
   return res.render('login');
}

async function logOutCurrentUser(req, res) {
   res.clearCookie('token');
   return res.status(204).redirect('/login');
}

module.exports = {
   redirectToUserHome,
   redirectToSignUp,
   redirectToLogIn,
   logOutCurrentUser
}
