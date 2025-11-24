import express from "express";
import db from "../db.js"; 

const router = express.Router();

// Listar todas as disciplinas
router.get("/", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM disciplinas");
    res.json(rows);
});

// Obter disciplina específica
router.get("/:id", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM disciplinas WHERE id_disciplina = ?", [req.params.id]);
    res.json(rows[0]);
});

// Criar disciplina
router.post("/", async (req, res) => {
    const { nome, curso, professor } = req.body;
    await db.query("INSERT INTO disciplinas (nome, curso, professor) VALUES (?, ?, ?)", [nome, curso, professor]);
    res.json({ message: "Disciplina criada com sucesso!" });
});

// Atualizar disciplina
router.put("/:id", async (req, res) => {
    const { nome, curso, professor } = req.body;
    await db.query("UPDATE disciplinas SET nome=?, curso=?, professor=? WHERE id_disciplina=?", [nome, curso, professor, req.params.id]);
    res.json({ message: "Disciplina atualizada com sucesso!" });
});

// Remover disciplina
router.delete("/:id", async (req, res) => {
    await db.query("DELETE FROM disciplinas WHERE id_disciplina=?", [req.params.id]);
    res.json({ message: "Disciplina removida com sucesso!" });
});

export default router;
