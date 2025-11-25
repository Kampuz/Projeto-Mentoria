import express from "express";
import db from "../db.js";

const router = express.Router();

// LISTAR
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("CALL sp_listar_mentores()");
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao listar mentores." });
    }
});

// OBTER UM
router.get("/:id", async (req, res) => {
    try {
        const [rows] = await db.query("CALL sp_obter_mentor(?)", [req.params.id]);

        if (rows[0].length === 0)
            return res.status(404).json({ mensagem: "Mentor não encontrado." });

        res.json(rows[0][0]);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar mentor." });
    }
});

// CRIAR
router.post("/", async (req, res) => {
    const { id_mentor, area_atuacao, bio, disponibilidade } = req.body;

    try {
        await db.query("CALL sp_criar_mentor(?, ?, ?, ?)", [
            id_mentor,
            area_atuacao,
            bio,
            disponibilidade
        ]);

        res.json({ mensagem: "Mentor criado com sucesso." });

    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ mensagem: "Este discente já é mentor." });
        }
        res.status(500).json({ erro: "Erro ao criar mentor." });
    }
});

// EDITAR
router.put("/:id", async (req, res) => {
    const { area_atuacao, bio, disponibilidade } = req.body;

    try {
        await db.query("CALL sp_atualizar_mentor(?, ?, ?, ?)", [
            req.params.id,
            area_atuacao,
            bio,
            disponibilidade
        ]);

        res.json({ mensagem: "Mentor atualizado com sucesso." });

    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar mentor." });
    }
});

// REMOVER
router.delete("/:id", async (req, res) => {
    try {
        await db.query("CALL sp_remover_mentor(?)", [req.params.id]);
        res.json({ mensagem: "Mentor removido com sucesso." });

    } catch (err) {
        res.status(500).json({ erro: "Erro ao remover mentor." });
    }
});

export default router;
