import { Router } from "express";
// import router from "./Oauth";

const router= Router()

const authcheck = (req,res,next) => {
    if(!req.user){
        //if user not login
        res.redirect('/auth/login')
    }else{
        //if logged in
        next()
    }
}

router.get('/',authcheck, (req,res) => {
    res.render('profile',{user: req.user})
})

export default router;