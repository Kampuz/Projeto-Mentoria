import express from "express";
import db from "../db.js";

const router = express.Router();

/*
    TABELA:
    discentes_mentores(
        id_mentor INT PK (FK para discentes.id_discente),
        area_atuacao VARCHAR(150),
        bio TEXT,
        disponibilidade TEXT
    )
*/

// LISTAR TODOS OS MENTORES
router.get("/", async (req, res) => {
    const [rows] = await db.query(`
        SELECT 
            dm.id_mentor,
            d.nome AS nome_discente,
            d.email AS email_discente,
            dm.area_atuacao,
            dm.bio,
            dm.disponibilidade
        FROM discentes_mentores dm
        JOIN discentes d ON dm.id_mentor = d.id_discente
    `);

    res.json(rows);
});

// OBTER MENTOR ESPECÍFICO
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const [rows] = await db.query(`
        SELECT 
            dm.id_mentor,
            d.nome AS nome_discente,
            d.email AS email_discente,
            dm.area_atuacao,
            dm.bio,
            dm.disponibilidade
        FROM discentes_mentores dm
        JOIN discentes d ON dm.id_mentor = d.id_discente
        WHERE dm.id_mentor = ?
    `, [id]);

    if (rows.length === 0)
        return res.status(404).json({ mensagem: "Mentor não encontrado." });

    res.json(rows[0]);
});

// CRIAR UM MENTOR
router.post("/", async (req, res) => {
    const { id_mentor, area_atuacao, bio, disponibilidade } = req.body;

    try {
        await db.query(`
            INSERT INTO discentes_mentores (id_mentor, area_atuacao, bio, disponibilidade)
            VALUES (?, ?, ?, ?)
        `, [id_mentor, area_atuacao, bio, disponibilidade]);

        res.json({ mensagem: "Mentor criado com sucesso." });

    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ mensagem: "Este discente já é mentor." });
        }
        res.status(500).json({ erro: "Erro ao criar mentor." });
    }
});

// EDITAR UM MENTOR
router.put("/:id", async (req, res) => {
    const { area_atuacao, bio, disponibilidade } = req.body;

    await db.query(`
        UPDATE discentes_mentores
        SET area_atuacao = ?, bio = ?, disponibilidade = ?
        WHERE id_mentor = ?
    `, [area_atuacao, bio, disponibilidade, req.params.id]);

    res.json({ mensagem: "Mentor atualizado com sucesso." });
});

// REMOVER MENTOR
router.delete("/:id", async (req, res) => {
    await db.query("DELETE FROM discentes_mentores WHERE id_mentor = ?", [req.params.id]);
    res.json({ mensagem: "Mentor removido com sucesso." });
});

export default router;
