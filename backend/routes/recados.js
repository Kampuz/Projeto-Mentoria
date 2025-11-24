import express from "express";
import db from "../db.js"; 

const router = express.Router();

// Listar recados de uma disciplina
router.get("/:id", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM disciplina_recados WHERE id_disciplina = ?", [req.params.id]);
    res.json(rows);
});

// Criar recado para disciplina
router.post("/:id", async (req, res) => {
    const { tipo_evento, descricao, data_entrega, horario_prova, link_material } = req.body;
    await db.query(
        "INSERT INTO disciplina_recados (id_disciplina, tipo_evento, descricao, data_entrega, horario_prova, link_material) VALUES (?, ?, ?, ?, ?, ?)",
        [req.params.id, tipo_evento, descricao, data_entrega || null, horario_prova || null, link_material || null]
    );
    res.json({ message: "Recado criado com sucesso!" });
});

// Atualizar recado
router.put("/:id", async (req, res) => {
    const { tipo_evento, descricao, data_entrega, horario_prova, link_material } = req.body;
    await db.query(
        "UPDATE disciplina_recados SET tipo_evento=?, descricao=?, data_entrega=?, horario_prova=?, link_material=? WHERE id_evento=?",
        [tipo_evento, descricao, data_entrega || null, horario_prova || null, link_material || null, req.params.id]
    );
    res.json({ message: "Recado atualizado com sucesso!" });
});

// Remover recado
router.delete("/:id", async (req, res) => {
    await db.query("DELETE FROM disciplina_recados WHERE id_evento=?", [req.params.id]);
    res.json({ message: "Recado removido com sucesso!" });
});

export default router;