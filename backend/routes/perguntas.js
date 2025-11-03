import express from "express";
import db from "../db.js";
const router = express.Router();

// GET all questions with answers
router.get("/", async (req, res) => {
  const [rows] = await db.query(`
    SELECT p.id AS pergunta_id, p.titulo, u.nome AS autor,
      r.id AS resposta_id, r.conteudo, m.nome AS mentor
    FROM perguntas p
    JOIN usuarios u ON p.usuario_id = u.id
    LEFT JOIN respostas r ON r.pergunta_id = p.id
    LEFT JOIN mentores m ON r.mentor_id = m.id
    ORDER BY p.id DESC
  `);
  res.json(rows);
});

// POST new question
router.post("/", async (req, res) => {
  const { usuario_id, titulo } = req.body;
  const [result] = await db.query(
    "INSERT INTO perguntas (usuario_id, titulo) VALUES (?, ?)",
    [usuario_id, titulo]
  );
  res.json({ success: true, id: result.insertId });
});

// POST new answer
router.post("/responder", async (req, res) => {
  const { pergunta_id, mentor_id, conteudo } = req.body;
  await db.query(
    "INSERT INTO respostas (pergunta_id, mentor_id, conteudo) VALUES (?, ?, ?)",
    [pergunta_id, mentor_id, conteudo]
  );
  res.json({ success: true });
});

export default router;
