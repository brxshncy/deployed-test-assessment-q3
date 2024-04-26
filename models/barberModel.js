import mongoose from "mongoose";

const barberSchema = new mongoose.Schema({
    name: String,
    shiftStart: Date,
    shiftEnd: Date,
});

export const Barber = mongoose.model("Barber", barberSchema);
