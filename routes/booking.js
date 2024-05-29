const router = require("express").Router()


const Booking = require("../models/Booking")
const User = require("../models/User")
const Listing = require("../models/Listing")
/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body
    const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice })
    await newBooking.save()
    res.status(200).json(newBooking)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "Fail to create a new Booking!", error: err.message })
  }
})

/* GET BOOKING */
router.get("/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params
    const booking = await Booking.findById(bookingId)
    res.status(200).json(booking)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find booking!", error: err.message })
  }
}
)

router.delete("/trips/delete/:BookingId", async (req, res) => {
  try {
    const { BookingId } = req.params
    const booking = await Booking.findByIdAndDelete(BookingId)
    res.status(202).json(booking)
  }
  catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find trips!", error: err.message })
  }
})


router.post("/edit/:BookingId", async (req, res) => {
  try {
    const { BookingId } = req.params
    const updatedBooking = await Booking.findByIdAndUpdate(BookingId, req.body
      , { new: true });
    res.status(200).json(updatedBooking)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find trips!", error: err.message })
  }
}
)

router.post("/edit/:BookingId", async (req, res) => {
  try {
    const { BookingId } = req.params
    const updatedBooking = await Booking.findByIdAndUpdate(Booking , req.body
      , { new: true });
    res.status(200).json(updatedBooking)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find trips!", error: err.message })
  }
}
)


module.exports = router