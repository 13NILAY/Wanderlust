const express=require('express');
const router=express.Router();
const {listingSchema,reviewSchema}=require("../schema");

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        console.log(error);
        let errMsg=error.details.map((el)=>el.message).join(",");
        res.status(400).json({message:errMsg});
    }else{
        next();
    }
};
const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        res.status(400).json({message:errMsg});
    }else{
        next();
    }
};

const {
    createListing,
    getAllListing,
    getListingById,
    updateListing,
    deleteListing,
    postReview,
    deleteReview
}=require('../controller/listing');

router.post('/',validateListing,createListing);

router.get("/",getAllListing);

router.get('/:id',getListingById);

router.put('/:id',validateListing,updateListing);

router.delete("/:id",deleteListing);

router.post("/:id/reviews",validateReview,postReview);

router.delete("/:id/reviews/:reviewId",deleteReview);

module.exports=router;