const express = require('express');
const URL = require('../models/URL');

const router = express.Router();

router.get('/', async (req, res) => {
   if (!req.user) return res.redirect('/login')
   const URLs = await URL.find({ createdBy: req.user._id,});
   return res.render("home", {
      name: req.user.name,
      URLs: URLs,
   });
})

router.get('/signup', async (req, res) => {
   return res.render('signup');
})

router.get('/login', async (req, res) => {
   return res.render('login');
})

module.exports = router;