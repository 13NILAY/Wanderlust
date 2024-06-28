const express=require('express');
const router=express.Router();
const {
    createListing,
    getAllListing,
    getListingById,
    updateListing,
    deleteListing,
    postReview
}=require('../controller/listing');

router.post('/',createListing);

router.get("/",getAllListing);

router.get('/:id',getListingById);

router.put('/:id',updateListing);

router.delete("/:id",deleteListing);

router.post("/:id/reviews",postReview);

module.exports=router;