const express=require('express');
const router=express.Router();
const passport=require('passport')

const {signUp,login}=require("../controller/user");

router.post("/signup",signUp);
router.post("/login",passport.authenticate("local",{
    // failureFlash:true,
    failureMessage:"Invalid Credentials Please Try Again",
    // failureRedirect:"http://localhost:3000/signup",
    // failWithError:"Tnvalid"
}),login);

module.exports=router;