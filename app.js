const express=require('express');
const mongoose=require('mongoose')
require('dotenv').config();
const cookieParser=require("cookie-parser");
const cors=require("cors");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user");


const port=process.env.PORT;
const app=express();
const sessionOptions={
    secret:"9324263899",
    resave:false, 
    saveUninitialized:true,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        sameSite: 'lax' // 'strict' or 'none' if using secure cookies over HTTPS
    }
};
app.use(session(sessionOptions));
app.use(express.json());
app.use(cookieParser());
app.use(flash());
app.use(cors({
    origin: '*', // or 'https://wanderlust-three-hazel.vercel.app' for any origin
    credentials: true // allows cookies to be sent and received
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const url=process.env.MONGO_URL;

const dbconnect=async()=>{
    await mongoose.connect(url,{}).then(()=>{
        console.log('connected')
    }).catch((err)=>{
        console.log(err)
    })
}

// This should be included in your middleware setup in server.js
app.use((req, res, next) => {
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
  });
  

const  listingRouter=require('./router/listing'); 
app.use('/listing',listingRouter);


const userRouter=require("./router/user");
app.use('/',userRouter);




app.listen(port,()=>{
    console.log("Server is running on port ",port);
    dbconnect();
})