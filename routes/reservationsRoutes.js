import express from "express";
import pgclient from "../db.js";
import { requireAuth, requireAdmin } from "../middlewares/authMiddleware.js";

const reservationsRoutes = express.Router();

/*
────────────────────────────────────────────
GET reservations for logged-in user
URL: /api/reservations/user/:userId
────────────────────────────────────────────
*/
reservationsRoutes.get(
  "/user/:userId",
  requireAuth,
  async (req, res) => {
    const userId = req.params.userId;

    // Prevent user from accessing other users' reservations
    if (req.userId != userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    try {
      const result = await pgclient.query(
        `
        SELECT
          r.reservation_id,
          r.car_id,
          r.pickup_date,
          r.pickup_time,
          r.return_date,
          r.return_time,
          r.status,
          r.admin_note,
          r.total_price,

          u.full_name,
          u.phone,

          c.name AS car_name,
          c.image_url,
          c.price_per_day

        FROM reservations r
        JOIN users u ON r.user_id = u.user_id
        JOIN cars c ON r.car_id = c.car_id
        WHERE r.user_id = $1
        ORDER BY r.created_at DESC
        `,
        [userId]
      );

      res.json(result.rows);
    } catch (err) {
      console.error("GET user reservations error:", err.message);
      res.status(500).json({ error: "Error fetching reservations" });
    }
  }
);

/*
────────────────────────────────────────────
CREATE reservation (logged-in users only)
URL: /api/reservations
────────────────────────────────────────────
*/
reservationsRoutes.post(
  "/",
  requireAuth,
  async (req, res) => {
    const {
      user_id,
      car_id,
      pickup_date,
      pickup_time,
      return_date,
      return_time,
      total_price,
    } = req.body;

    // Ensure reservation is created by logged-in user
    if (req.userId != user_id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    try {
      const result = await pgclient.query(
        `
        INSERT INTO reservations
        (user_id, car_id, pickup_date, pickup_time, return_date, return_time, total_price, status, admin_note)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', '')
        RETURNING *
        `,
        [
          user_id,
          car_id,
          pickup_date,
          pickup_time,
          return_date,
          return_time,
          total_price,
        ]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("POST reservation error:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
);

/*
────────────────────────────────────────────
DELETE reservation (user deletes own only)
URL: /api/reservations/:id
────────────────────────────────────────────
*/
reservationsRoutes.delete(
  "/:id",
  requireAuth,
  async (req, res) => {
    const reservationId = req.params.id;

    try {
      // Check ownership
      const check = await pgclient.query(
        `SELECT user_id FROM reservations WHERE reservation_id = $1`,
        [reservationId]
      );

      if (check.rows.length === 0) {
        return res.status(404).json({ message: "Reservation not found" });
      }

      if (check.rows[0].user_id != req.userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      const result = await pgclient.query(
        `DELETE FROM reservations WHERE reservation_id = $1 RETURNING *`,
        [reservationId]
      );

      res.json({
        message: "Reservation deleted successfully",
        reservation: result.rows[0],
      });
    } catch (err) {
      console.error("DELETE reservation error:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
);

/*
────────────────────────────────────────────
GET ALL reservations (ADMIN ONLY)
URL: /api/reservations
────────────────────────────────────────────
*/
reservationsRoutes.get(
  "/",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const result = await pgclient.query(
        `
        SELECT
          r.reservation_id,
          r.pickup_date,
          r.pickup_time,
          r.return_date,
          r.return_time,
          r.status,
          r.total_price,
          r.admin_note,

          u.full_name,
          u.email,
          u.phone,

          c.name AS car_name,
          c.image_url,
          c.price_per_day

        FROM reservations r
        JOIN users u ON r.user_id = u.user_id
        JOIN cars c ON r.car_id = c.car_id
        ORDER BY r.created_at DESC
        `
      );

      res.json(result.rows);
    } catch (err) {
      console.error("GET all reservations error:", err.message);
      res.status(500).json({ error: "Error fetching reservations" });
    }
  }
);

/*
────────────────────────────────────────────
UPDATE reservation status + admin note
(ADMIN ONLY)
URL: /api/reservations/:id
────────────────────────────────────────────
*/
reservationsRoutes.put(
  "/:id",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    const reservationId = req.params.id;
    const { status, admin_note } = req.body;

    try {
      const result = await pgclient.query(
        `
        UPDATE reservations
        SET status = $1, admin_note = $2
        WHERE reservation_id = $3
        RETURNING *
        `,
        [status, admin_note, reservationId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Reservation not found" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error("UPDATE reservation error:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
);



// UPDATE reservation (USER)
// USER: update reservation dates/times (only if pending)
reservationsRoutes.put("/user/:id", requireAuth, async (req, res) => {
  const reservationId = req.params.id;

  const {
    pickup_date,
    pickup_time,
    return_date,
    return_time
  } = req.body;

  try {
    // get reservation + check ownership + status
    const existing = await pgclient.query(
      `SELECT * FROM reservations WHERE reservation_id = $1`,
      [reservationId]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    const r = existing.rows[0];

    // only owner can update
    if (String(r.user_id) !== String(req.userId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // only pending can be updated
    if (r.status !== "pending") {
      return res.status(400).json({ message: "Only pending reservations can be updated" });
    }

    // update only schedule (keep same car_id, user_id)
    const updated = await pgclient.query(
      `
      UPDATE reservations
      SET pickup_date = $1,
          pickup_time = $2,
          return_date = $3,
          return_time = $4
      WHERE reservation_id = $5
      RETURNING *
      `,
      [pickup_date, pickup_time, return_date, return_time, reservationId]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("PUT /reservations/user/:id ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});


export default reservationsRoutes;
