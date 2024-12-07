import passport from "passport";
// import passport from "passport";
import GoogleStrategy from "passport-google-oauth20"
import User from "../models/usermodels.js";
import dotenv from "dotenv"

dotenv.config({
    path : "./.env"
})


passport.serializeUser((user,done) => {
  done(null,user.id)
})
  
passport.deserializeUser((id, done) => {
  User.findById(id).then((user)=>{
done(null,user);
  })
  
});


passport.use(
  new GoogleStrategy(
    {
      //options for the google user

      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "/auth/google/redirect",
    },
    async(accessToken, refreshToken, profile, done) => {
      //check if user exist in database
      // console.log(profile._json.picture);
      

const findone = await User.findOne({googleId:profile.id})

if (findone) {
  console.log(`user is ${findone}`);

  done(null,findone)
  
}else{
  const profileImage = profile._json.picture;
  const id = profile.id;
  const name = profile.displayName;

  try {
    const user = await User.create({
      username: name,
      googleId: id,
      profileImage:profileImage,
    });
    console.log(` this is new user ${user}`);
    done(null,user)
  } catch (error) {
    console.log(error);
  }
}
    }
  )
);

export default passport;


