import express from "express"
import Oauthroutes from "./routes/Oauth.js"
import profileroutes from "./routes/profileroutes.js"
import passport from "passport";
import dotenv from "dotenv"
import passportsetup from "./config/passport-setup.js"
import session from "express-session";
import mongoose from "mongoose"
import cookieSession from "cookie-session"


dotenv.config({
    path : "./.env"
})

mongoose
  .connect(process.env.MONGODB_URI
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


const app = express()

//cookie
app.use(
  session({
    secret: process.env.COOKIE || "klklkl",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
    },
  })
);


//initialize passport
app.use(passport.initialize());
app.use(passport.session())

//set up view engine 
app.set('view engine', 'ejs')

//set up routes
app.use('/auth',Oauthroutes);
app.use('/profile',profileroutes)


app.get('/', (req,res) => {
    res.render('home',{user:req.user})
})

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
    
})

// const fk = process.env.clientid

// console.log(fk);
