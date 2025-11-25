import express from "express";
import db from "../db.js";

const router = express.Router();

// LISTAR TODOS
router.get("/", async (req, res) => {
    const [rows] = await db.query(`
        SELECT
            d.*,
            CASE
                WHEN dm.id_mentor IS NOT NULL THEN 1
                ELSE 0
            END AS e_mentor
        FROM discentes d
        LEFT JOIN discentes_mentores dm
            ON dm.id_mentor = d.id_discente
    `);

    res.json(rows);
});

// BUSCAR POR ID
router.get("/:id", async (req, res) => {
    const [rows] = await db.query(
        "SELECT * FROM discentes WHERE id_discente = ?",
        [req.params.id]
    );

    if (rows.length === 0)
        return res.status(404).json({ mensagem: "Discente não encontrado" });

    res.json(rows[0]);
});

// CRIAR
router.post("/", async (req, res) => {
    const { nome, email, matricula, periodo } = req.body;

    const [result] = await db.query(
        "CALL sp_criar_discente(?, ?, ?, ?)",
        [nome, email, matricula, periodo]
    );

    // MySQL retorna insertId na próxima posição do array
    res.json({ mensagem: "Discente criado", id: result.insertId });
});

// ATUALIZAR
router.put("/:id", async (req, res) => {
    const { nome, email, matricula, periodo } = req.body;

    await db.query(
        "CALL sp_atualizar_discente(?, ?, ?, ?, ?)",
        [req.params.id, nome, email, matricula, periodo]
    );

    res.json({ mensagem: "Discente atualizado" });
});

// PROMOVER
router.post("/:id/promover", async (req, res) => {
    const id = req.params.id;

    const [rows] = await db.query(
        "SELECT * FROM discentes_mentores WHERE id_mentor = ?",
        [id]
    );

    if (rows.length > 0)
        return res.json({ mensagem: "Este discente já é mentor." });

    await db.query("CALL sp_promover_mentor(?)", [id]);

    res.json({ mensagem: "Discente promovido a mentor" });
});

// DESVINCULAR
router.delete("/:id/desvincular", async (req, res) => {
    const id = req.params.id;

    const [existing] = await db.query(
        "SELECT * FROM discentes_mentores WHERE id_mentor = ?",
        [id]
    );

    if (existing.length === 0)
        return res.status(404).json({ mensagem: "Este discente não é mentor." });

    await db.query("CALL sp_desvincular_mentor(?)", [id]);

    res.json({ mensagem: "Discente deixou de ser mentor" });
});

// REMOVER DISCENTE
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const [result] = await db.query("CALL sp_remover_discente(?)", [id]);

    res.json({ message: "Discente removido com sucesso" });
});

// LISTAR DISCIPLINAS
router.get("/:id/disciplinas", async (req, res) => {
    const [rows] = await db.query(
        `SELECT d.* 
         FROM disciplinas d
         JOIN disciplina_alunos da ON d.id_disciplina = da.id_disciplina
         WHERE da.id_discente = ?`,
        [req.params.id]
    );

    res.json(rows);
});

// ADICIONAR DISCIPLINA
router.post("/:id/disciplinas", async (req, res) => {
    const { id_disciplina } = req.body;

    await db.query(
        "CALL sp_discente_add_disciplina(?, ?)",
        [req.params.id, id_disciplina]
    );

    res.json({ message: "Disciplina adicionada ao discente" });
});

// REMOVER DISCIPLINA
router.delete("/:id/disciplinas/:id_disciplina", async (req, res) => {
    await db.query(
        "CALL sp_discente_remove_disciplina(?, ?)",
        [req.params.id, req.params.id_disciplina]
    );

    res.json({ message: "Disciplina removida do discente" });
});

// RECADOS DO DISCENTE
router.get("/:id/recados", async (req, res) => {
    const [rows] = await db.query(
        `SELECT dr.* 
         FROM disciplina_recados dr
         JOIN disciplina_alunos da ON dr.id_disciplina = da.id_disciplina
         WHERE da.id_discente = ?`,
        [req.params.id]
    );

    res.json(rows);
});

export default router;
