import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import carsRoutes from "./routes/carsRoutes.js";
import reservationsRoutes from "./routes/reservationsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import pgclient from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// ================= MIDDLEWARES =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
// http://localhost:3000/api/cars
app.use("/api/cars", carsRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/auth", authRoutes);


// ================= TEST ROUTES =================
app.get("/", (req, res) => {
  res.send("BMW Rental API is running");
});

app.get("/test", (req, res) => {
  res.json({ message: "API test successful" });
});

// ================= NOT FOUND =================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ================= START SERVER =================
pgclient.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
});
