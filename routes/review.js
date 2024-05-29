const router = require("express").Router()

const Review = require("../models/Review")
const User = require("../models/User")
const Listing = require("../models/Listing")

/* CREATE REVIEW */
router.post("/create", async (req, res) => {
    try {
        const {propertyId, userId, rating, comment } = req.body
        const user = await User.findById(userId)
        const listing = await Listing.findById(propertyId)
        const newReview = new Review({  propertyId,userId, rating, comment })
        await newReview.save()
        newReview.userId = user
        res.status(200).json(newReview)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Fail to create a new Review!", error: err.message })
    }
}
)





router.delete("/:reviewId", async (req, res) => {
    try {
        const { reviewId } = req.params
        const review = await Review.findByIdAndDelete(reviewId)
        res.status(202).json(review)
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ message: "Can not find reviews!", error: err.message })
    }
}
)


/* GET ALL REVIEWS */
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find()
        res.status(200).json(reviews)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "Can not find reviews!", error: err.message })
    }
}
)

/* GET REVIEWS BY PROPERTY */
router.get("/:listingId", async (req, res) => {
    try {
        const { listingId } = req.params;
        const reviews = await Review.find({ propertyId: listingId }).populate("userId")
        res.status(200).json(reviews)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "Can not find reviews!", error: err.message })
    }
}
)




module.exports = router