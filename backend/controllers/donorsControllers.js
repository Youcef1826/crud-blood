import Donor from "../models/Donor.js";

// Create donor
export const createDonor = async (req, res) => {

    const { name, bloodGroup, donationDate, city, birthDate, health } = req.body;
    try {
        const newDonor = new Donor({
            name,
            bloodGroup,
            donationDate,
            city,
            birthDate,
            health
        });

        const donor = await newDonor.save();
        res.status(201).json(donor);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error(error);
    };
};

// Get all donors
export const getDonors = async (req, res) => {

    try {
        const donors = await Donor.find();
        res.status(200).json(donors);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error(error);
    };
};

// Get donor by ID
export const donorId = async (req, res) => {

    try {
        const donor = await Donor.findById(req.params.id);

        if (!donor) {
            return res.status(404).json({ error: "Donor not found" });
        };
        res.status(200).json(donor);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error(error);
    };
};

// Update donor
export const updateDonor = async (req, res) => {

    const { name, bloodGroup, donationDate, city, birthDate, health } = req.body;
    try {
        const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!donor) {
            return res.status(404).json({ error: "Donor not found" });
        };

        res.status(200).json(donor);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error(error);
    };
};

// Delete donor
export const deleteDonor = async (req, res) => {

    try {
        const donor = await Donor.findByIdAndDelete(req.params.id);

        if (!donor) {
            return res.status(404).json({ error: "Donor not found" });
        };

        res.status(200).json({ message: "Donor removed successfully" });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error(error);
    };
};