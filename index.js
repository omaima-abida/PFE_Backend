const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const userRoutes = require("./routes/user.js")
const paymentRouter = require( "./routes/payment.js") 
const flightRoutes = require("./routes/Flight.js")
const reviewRoutes = require("./routes/review.js")

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use('/api/payment', paymentRouter); 


/* ROUTES */
app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)
app.use("/flights", flightRoutes)
app.use("/reviews", reviewRoutes)


/* MONGOOSE SETUP */
const PORT = 3001;

mongoose.connect(process.env.MONGO_URL, {
    dbName: "Dream_Nest",
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
    