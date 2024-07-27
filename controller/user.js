const User=require("../models/user");

const signUp=async(req,res)=>{
    try{
        
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser= await User.register(newUser,password);
    console.log(registeredUser);
    
    res.status(200).json({
        success:true
    });
    }catch(err){
        res.status(400).json({message:err.message});
    }
};
const login= async (req, res) => {
    // This will only run if authentication was successful
   try{
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      let id = req.user._id;
      console.log(req);
      res.status(200).json({ message: "success", _id: id });
   }catch(err){
    res.status(400).json({message:err.message});
   }
}

module.exports={signUp,login}