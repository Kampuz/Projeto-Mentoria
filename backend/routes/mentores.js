import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM mentores");
    res.json(rows);
});

router.post("/", async (req, res) => {
    const { nome, area, email } = req.body;
    await pool.query("INSERT INTO mentores (nome, area, email) VALUES (?, ?, ?)", [nome, area, email]);
    res.status(201).json({ message: "Mentor cadastrado" });
});

export default router;