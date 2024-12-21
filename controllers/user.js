const URL = require("../models/URL");
const User = require('../models/User');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
   const { name, email, password } = req.body;

   const user =  User.create({ name, email, password });

   const token = setUser({ _id: user._id, name: user.name });
   res.cookie("token", token);

   return res.status(201).render('home', { name });
}

async function handleUserLogin(req, res) {
   const { email, password } = req.body;
   const user = await User.findOne({ email, password });

   if (!user) return res.status(404).render('login', {
      error: 'Invalid Username or Password'
   })
   
   const URLs = await URL.find({ createdBy: user._id });

   const token = setUser({ _id: user._id, name: user.name });
   res.cookie("token", token);

   return res.status(200).render('home', { name: user.name, URLs: URLs });
}

module.exports = {
   handleUserSignup,
   handleUserLogin
};
