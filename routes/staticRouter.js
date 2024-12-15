const express = require('express');
const URL = require('../models/URL');
const { 
   redirectToUserHome, 
   redirectToSignUp, 
   redirectToLogIn, 
   logOutCurrentUser 
} = require("../controllers/staticRouter");

const router = express.Router();

router.get('/', redirectToUserHome);
router.get('/signup', redirectToSignUp);
router.get('/login', redirectToLogIn);
router.get('/logout', logOutCurrentUser);

module.exports = router;