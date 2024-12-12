const express = require('express');
const connectMongoDB = require('./conn')
const URLRoute = require('./routes/url');
const { URL } = require('./models/URL')

const app = express();
const PORT = 8080;

// MIDDLEWARES
app.use(express.json());

// MONGODB CONNECTION
connectMongoDB('mongodb://127.0.0.1:27017/shorturl')
   .then(() => console.log("Successfully Connect to MongoDB"))
   .catch((err) => console.log("Error Connecting to DB: ", err));

// MAIN ROUTE
app.get('/', (req, res) => { 
   return res.json("Welcome to URL SHORTENER APP")
});

// ROUTES
app.use('/api/url', URLRoute)

app.get('/:shortId', async (req, res) => {
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