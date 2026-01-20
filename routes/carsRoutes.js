import express from "express";
import pgclient from "../db.js";

const carsRoutes = express.Router();

// GET all cars
// URL: http://localhost:3000/api/cars
carsRoutes.get("/", async (req, res) => {
  try {
    const result = await pgclient.query(
      "SELECT * FROM cars ORDER BY car_id"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cars data" });
  }
});

// GET car by id
// URL: http://localhost:3000/api/cars/1
carsRoutes.get("/:id", async (req, res) => {
  try {
    const result = await pgclient.query(
      "SELECT * FROM cars WHERE car_id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching car data" });
  }
});

export default carsRoutes;
