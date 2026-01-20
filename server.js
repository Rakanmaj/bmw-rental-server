import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pgclient from "./db.js";

// AUTH ROUTES
import authRoutes from "./routes/authRoutes.js";

// CARS ROUTES
import carsRoutes from "./routes/carsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ================= MIDDLEWARES =================
app.use(cors());
app.use(express.json());

// ================= TEST ROUTES =================
app.get("/", (req, res) => {
  res.send("BMW Rental Backend is running ");
});

app.get("/test", (req, res) => {
  res.json({
    status: "success",
    message: "API test successful",
  });
});

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/cars", carsRoutes);

// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ================= START SERVER =================
pgclient
  .connect()
  .then(() => {
    console.log("Database connected ");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed ");
    console.error(err);
  });
