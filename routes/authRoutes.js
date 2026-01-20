import express from "express";
import pgclient from "../db.js";
import bcrypt from "bcryptjs";  // For password hashing
const router = express.Router();

// Sign-Up Route (POST /signup)
router.post("/signup", async (req, res) => {
  const { full_name, email, password, phone, role } = req.body;

  try {
    // Check if the user already exists
    const exists = await pgclient.query("SELECT * FROM users WHERE email = $1", [email]);
    if (exists.rows.length > 0) return res.status(400).json({ message: "User already exists" });

    // Hash password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the users table
   const result = await pgclient.query(
  "INSERT INTO users (full_name, email, password, phone, role) VALUES ($1, $2, $3, $4, COALESCE($5, 'user')) RETURNING *",
  [full_name, email, hashedPassword, phone, role] // `role` is optional and will default to 'user' if not provided
);

    res.status(201).json({ user: result.rows[0] });  // Send back the created user
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route (POST /login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const result = await pgclient.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the password with the hashed password stored in the database
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Send user data excluding the password
    res.json({ user: { ...user, password: undefined } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
