const shortid = require('shortid')
const URL = require('../models/URL');

async function handleGenerateNewShortURL(req, res) {
   const body = req.body;
   if (!body.url) {
      return res.status(400).json({
         "error" : "no valid url mentioned"
      })
   }

   const shortID = shortid();
   const flag = await URL.find({ redirectURL: body.url});

   console.log(flag)
   if (flag.length === 0) {
      await URL.create({
         shortId: shortID,
         redirectURL: body.url,
         visitHistory: [],
         createdBy: req.user._id,
      });
      
      const URLs = await URL.find({ createdBy: req.user._id,});

      return res.render("home", {
         "name": req.user.name,
         "id" : shortID,
         "URLs": URLs
      });

   } else {
      const URLs = await URL.find({ createdBy: req.user._id,});

      return res.render("home", {
         name: req.user.name,
         URLs: URLs,
      });
   }
}

async function handleAnalytics(req, res) {
   const shortId = req.params.shortId;
   const result = await URL.findOne({ shortId });

   return res.status(200).json({ 
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory
   })

}

module.exports = {
   handleGenerateNewShortURL,
   handleAnalytics
}