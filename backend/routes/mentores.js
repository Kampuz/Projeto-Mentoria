// backend/routes/mentores.js
import express from "express";
import db from "../db.js";
const router = express.Router();

// GET all mentors
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM mentores");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update mentor by id
router.put("/:id", async (req, res) => {
  const { nome, email, horario_disponivel, local } = req.body;
  try {
    await db.query(
      "UPDATE mentores SET nome=?, email=?, horario_disponivel=?, local=? WHERE id=?",
      [nome, email, horario_disponivel, local, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
