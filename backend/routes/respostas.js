import express from "express";
import db from "../db.js";
const router = express.Router();

// GET todas as respostas
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.id AS resposta_id, r.conteudo, r.pergunta_id, r.mentor_id, m.nome AS mentor
      FROM respostas r
      JOIN mentores m ON r.mentor_id = m.id
      ORDER BY r.id ASC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST criar nova resposta
router.post("/", async (req, res) => {
  try {
    const { pergunta_id, mentor_id, conteudo } = req.body;
    const [result] = await db.query(
      "INSERT INTO respostas (pergunta_id, mentor_id, conteudo) VALUES (?, ?, ?)",
      [pergunta_id, mentor_id, conteudo]
    );
    res.json({ success: true, resposta_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT atualizar resposta (opcional)
router.put("/:id", async (req, res) => {
  try {
    const { conteudo } = req.body;
    await db.query(
      "UPDATE respostas SET conteudo=? WHERE id=?",
      [conteudo, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
