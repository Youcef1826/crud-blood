import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({

    name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    donationDate: { type: Date, required: true },
    city: { type: String, required: true },
    birthDate: { type: Date, required: true },
    health: { type: String, required: true },
});
export default mongoose.model("Donor", donorSchema);