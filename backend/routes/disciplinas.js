import express from "express";
import db from "../db.js";

const router = express.Router();

// LISTAR TODAS
router.get("/", async (req, res) => {
    const [rows] = await db.query("CALL sp_listar_disciplinas()");
    res.json(rows[0]); // MySQL retorna dentro do índice 0
});

// OBTER UMA
router.get("/:id", async (req, res) => {
    const [rows] = await db.query("CALL sp_obter_disciplina(?)", [req.params.id]);
    res.json(rows[0][0] || null);
});

// CRIAR
router.post("/", async (req, res) => {
    const { nome, curso, professor } = req.body;

    await db.query(
        "CALL sp_criar_disciplina(?, ?, ?)",
        [nome, curso, professor]
    );

    res.json({ message: "Disciplina criada com sucesso!" });
});

// ATUALIZAR
router.put("/:id", async (req, res) => {
    const { nome, curso, professor } = req.body;

    await db.query(
        "CALL sp_atualizar_disciplina(?, ?, ?, ?)",
        [req.params.id, nome, curso, professor]
    );

    res.json({ message: "Disciplina atualizada com sucesso!" });
});

// REMOVER
router.delete("/:id", async (req, res) => {
    await db.query("CALL sp_remover_disciplina(?)", [req.params.id]);
    res.json({ message: "Disciplina removida com sucesso!" });
});

// LISTAR RECADOS
router.get("/:id/recados", async (req, res) => {
    const [rows] = await db.query("CALL sp_listar_recados(?)", [req.params.id]);
    res.json(rows[0]);
});

// CRIAR RECADO
router.post("/:id/recados", async (req, res) => {
    const { id } = req.params;
    const { tipo_recado, descricao, data, link_material } = req.body;

    await db.query(
        "CALL sp_criar_recado(?, ?, ?, ?, ?)",
        [
            id,
            tipo_recado,
            descricao,
            data,
            link_material
        ]
    );

    res.json({ message: "Recado criado com sucesso!" });
});

export default router;
