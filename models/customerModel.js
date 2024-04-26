import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: String,
    arrivalTime: Date,
});

export const Customer = mongoose.model("Customer", customerSchema);
