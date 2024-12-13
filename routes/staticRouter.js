const express = require('express');
const URL = require('../models/URL');

const router = express.Router();

router.get('/', async (req, res) => {
   const URLs = await URL.find({});
   return res.render("home", {
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