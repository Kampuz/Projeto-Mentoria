import express from "express";
import db from "../db.js";

const router = express.Router();

// ADICIONAR
router.post("/", async (req, res) => {
    const { id_atividade, tipo_atendimento, observacoes, id_mentor_responsavel } = req.body;

    try {
        await db.query(
            "CALL sp_criar_atendimento(?, ?, ?, ?)",
            [id_atividade, tipo_atendimento, observacoes, id_mentor_responsavel]
        );

        res.json({ message: "Atendimento criado" });
    } catch (err) {
        console.error("ERRO AO INSERIR:", err);
        res.status(500).json({ error: "Erro ao criar atendimento" });
    }
});

// EDITAR
router.put("/:id_atendimento", async (req, res) => {
    const { id_atendimento } = req.params;
    const { tipo_atendimento, observacoes, id_mentor_responsavel } = req.body;

    try {
        await db.query(
            "CALL sp_atualizar_atendimento(?, ?, ?, ?)",
            [id_atendimento, tipo_atendimento, observacoes, id_mentor_responsavel]
        );

        res.json({ message: "Atendimento atualizado" });
    } catch (err) {
        console.error("ERRO:", err);
        res.status(500).json({ error: "Erro ao atualizar atendimento" });
    }
});

export default router;
