// Import required modules
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config.js";
import colors from "colors";
import { Barber } from "./models/barberModel.js";
import { Customer } from "./models/customerModel.js";
import { Queue } from "./models/queueSchema.js";

dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Connect to MongoDB
connectDB();

// API endpoints

// Add a new barber
app.post("/barbers", async (req, res) => {
    try {
        console.log(req.body);
        const barber = await Barber.create(req.body);
        res.status(203).json({
            barber,
        });
    } catch (err) {
        console.log("err", err);
        res.status(400).send(err);
    }
});

// Add a new customer to the queue
app.post("/customers", async (req, res) => {
    try {
        const { barberId } = req.query;
        const customer = await Customer.create(req.body);
        // Add the customer to the queue
        const queuePosition = await Queue.countDocuments();
        const queueItem = await Queue.create({
            customerId: customer._id,
            position: queuePosition + 1,
            barberId,
        });
        res.status(201).send(customer);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Calculate waiting time estimation
app.get("/waiting-time", async (req, res) => {
    try {
        // Get the number of customers in the queue
        const numberOfCustomers = await Queue.countDocuments();
        // Get the number of barbers currently working
        const currentTime = new Date();
        const activeBarbers = await Barber.find({
            shiftStart: { $lte: currentTime },
            shiftEnd: { $gte: currentTime },
        }).countDocuments();
        // Calculate waiting time based on the number of customers and active barbers
        const serviceInterval = 30; // minutes
        const serviceTime = 25; // minutes
        const additionalBarbers = Math.ceil(
            (numberOfCustomers - activeBarbers) / serviceInterval
        );
        const waitingTime =
            (numberOfCustomers * serviceTime) / activeBarbers +
            additionalBarbers * serviceInterval;
        res.status(200).send({ waitingTime });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
