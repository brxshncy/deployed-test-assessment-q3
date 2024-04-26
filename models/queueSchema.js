import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    barberId: { type: mongoose.Schema.Types.ObjectId, ref: "Barber" },
    position: Number,
});

export const Queue = mongoose.model("Queue", queueSchema);
