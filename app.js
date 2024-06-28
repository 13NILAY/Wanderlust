const express=require('express');
const mongoose=require('mongoose')
require('dotenv').config();
const cookieParser=require("cookie-parser");
const cors=require("cors");

const ExpressError=require("./utils/ExpressError");
const port=process.env.PORT;
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:'*'}));

const url=process.env.MONGO_URL;

const dbconnect=async()=>{
    await mongoose.connect(url,{}).then(()=>{
        console.log('connected')
    }).catch((err)=>{
        console.log(err)
    })
}

const  listingRouter=require('./router/listing');
app.use('/listing',listingRouter);

app.use((err,req,res,next)=>{
    res.send("Something went wrong !");
});



app.listen(port,()=>{
    console.log("Server is running on port ",port);
    dbconnect();
})