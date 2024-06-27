import express from "express";
import * as donorsControllers from "../controllers/donorsControllers.js";

const router = express.Router();

// Routes
router.post("/donors", donorsControllers.createDonor); // Create
router.get("/donors", donorsControllers.getDonors); // Get all donors
router.get("/donors/:id", donorsControllers.donorId); // Get donor by ID
router.put("/donors/:id", donorsControllers.updateDonor); // Update
router.delete("/donors/:id", donorsControllers.deleteDonor); // Delete

export default router;