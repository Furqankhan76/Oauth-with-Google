import express from "express"
import passport from "passport";

import { Router } from "express"
 
const router = Router();


//auth login
router.get('/login', (req,res) =>{
    res.render('login',{user:req.user})
});

//auth logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Pass error to error handler
    }
    res.redirect("/"); // Redirect to homepage after successful logout
  });
});

//auth with google
router.get('/google', passport.authenticate("google", {
    scope:['profile']
})
)

//callback route for google to redirect
router.get('/google/redirect',passport.authenticate('google'), (req,res) =>{
    // req.user
    // res.send(req.user)
    res.redirect('/profile')
} )

export default router;

