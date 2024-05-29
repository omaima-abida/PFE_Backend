const router = require("express").Router();
const Flight = require("../models/Flight");
const User = require("../models/User");
const FlightTicket = require("../models/FlightTicket");

/* CREATE FLIGHT */
router.post("/create", async (req, res) => {
    try {
        const { airline, flightNumber, source, destination, departureTime, arrivalTime, price
            , seatsAvailable
        } = req.body;
        const newFlight = new Flight({
            airline: airline,
            flightNumber: flightNumber,
            source: source,
            destination: destination,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            price: price,
            seatsAvailable: seatsAvailable
        });
        await newFlight.save();
        res.status(200).json(newFlight);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Fail to create a new Flight!", error: err.message });
    }
});

/* GET FLIGHT */

router.get("/:flightId", async (req, res) => {
    try {
        const { flightId } = req.params;
        const flight = await Flight.findById(flightId);
        res.status(200).json(flight);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Can not find flight!", error: err.message });
    }
}
);

router.delete("/flights/delete/:flightId", async (req, res) => {
    try {
        const { flightId } = req.params;
        const flight = await Flight.findByIdAndDelete(flightId);
        res.status(202).json(flight);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: "Can not find flights!", error: err.message });
    }
});

router.post("/edit/:flightId", async (req, res) => {
    try {
        const { flightId } = req.params;
        const updatedFlight = await Flight.findByIdAndUpdate(flightId, req.body
            , { new: true });
        res.status(200).json(updatedFlight);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Can not find flights!", error: err.message });
    }
}
);

/* GET ALL FLIGHTS */
router.get("/", async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json(flights);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Can not find flights!", error: err.message });
    }
});

/* CREATE TICKET */
router.post("/ticket/:flightId", async (req, res) => {
    try {
        const { flightId } = req.params;
        const flight = await Flight.findById(flightId);
        const { passengerId, seatNumber, ticketNumber, price } = req.body;
        const newTicket = new FlightTicket({
            flight: flightId,
            passengerId: passengerId,
            seatNumber: seatNumber,
            ticketNumber: ticketNumber,
            price: price
        });
        await newTicket.save();
        res.status(200).json(newTicket);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Fail to create a new Ticket!", error: err.message });
    }
});

/* cancel TICKET */
router.put("/ticket/cancel/:ticketId", async (req, res) => {
    try {
        const { ticketId } = req.params;
        const updatedTicket = await FlightTicket.findByIdAndUpdate(ticketId, req.body
            , { new: true });
        res.status(200).json(updatedTicket);
        }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: "Can not find ticket!", error: err.message });
    }
});


module.exports = router