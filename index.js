const express = require('express');
const connectMongoDB = require('./conn');
const path = require('path')
const { URL } = require('./models/URL');
const { default: mongoose } = require("mongoose");

const URLRoute = require('./routes/url');
const StaticRoute = require('./routes/staticRouter')

const app = express();
const PORT = 8080;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

// MONGODB CONNECTION
connectMongoDB('mongodb://127.0.0.1:27017/shorturl')
   .then(() => console.log("Successfully Connect to MongoDB"))
   .catch((err) => console.log("Error Connecting to DB: ", err));

// ROUTES
app.use('/api/url', URLRoute)
app.use('/', StaticRoute)

app.get('/api/:shortId', async (req, res) => {
   const shortId = req.params.shortId;
   console.log(shortId)
   const date = new Date();
   const result = await URL.findOneAndUpdate({
      shortId,
   },
   {
      $push: {
         visitHistory: {
            timestamp: date
         }
      }
   })

   return res.status(200).redirect(result.redirectURL);
})

app.listen(PORT, () => {
   console.log(`App listening at http://localhost:8080`);
})