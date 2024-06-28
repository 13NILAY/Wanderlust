
const Listing =require("../models/listing");
const Review=require("../models/review");

const createListing =async (req,res)=>{
    try{
        console.log(req.body);
        const listing=new Listing(req.body);
        await listing.save();
        res.status(200).json({
            success:true
        });
    }catch(err){
        console.log(err)
        res.status(400).json({message:err.message});
    }

};

const getAllListing=async (req,res)=>{
    try{
        const listings=await Listing.find();
        res.json(listings);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

const getListingById=async (req,res)=>{
    try{
        const {id}=req.params;
        const listing=await Listing.findById(id) ;
        if (listing === null) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(listing);
    }catch(err){
        res.status(400).json({message :err.message});
    }
}

const updateListing=async(req,res)=>{
    try{
        console.log(req.body);
        const updatedListing=await Listing.findByIdAndUpdate(req.body._id,{...req.body});
        if (updatedListing === null) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(updatedListing);
    }catch(err){
        res.status(400).json({message :err.message});
    }
};

const deleteListing=async(req,res)=>{
    try{
        const listing= await Listing.findByIdAndDelete(req.params.id);
        
        res.json({message : "Listing Deleted Successfully"});

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

const postReview=async(req,res)=>{
    try{
        console.log(req.body);
        let listing=await Listing.findById(req.params.id);
        let newReview=new Review(req.body);

        listing.reviews.push(newReview);
        await newReview.save();
        const savedListing=await listing.save();
        res.status(200).json(savedListing);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
    
}
module.exports={
    createListing,
    getAllListing,
    getListingById,
    updateListing,
    deleteListing,
    postReview
};

