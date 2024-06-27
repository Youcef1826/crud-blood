import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import donorsRoutes from "./routes/donorsRoutes.js";

const app = express();
const port = 3000;

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(donorsRoutes);

// Listen
app.listen(port, () => { console.log(`Server start at http://localhost:${port}`) } );