const User = require('../models/User');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
   const { name, email, password } = req.body;

   // Do Validation Here //TODO

   await User.create({ name, email, password });

   return res.status(201).render('home', { name });
}

async function handleUserLogin(req, res) {
   const { email, password } = req.body;
   const user = await User.findOne({ email, password });

   if (!user) return res.status(404).render('login', {
      error: 'Invalid Username or Password'
   })

   const token = setUser({ _id: user._id });
   res.cookie("uid", token);

   return res.status(200).redirect('/');
}

module.exports = {
   handleUserSignup,
   handleUserLogin
};