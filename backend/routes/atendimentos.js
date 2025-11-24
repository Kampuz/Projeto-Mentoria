import express from "express";
import db from "../db.js"; 

const router = express.Router();

// ADICIONAR
router.post("/atendimentos", async (req, res) => {
    const { id_atividade, tipo_atendimento, observacoes, id_mentor_responsavel } = req.body;

    await db.query(`
        INSERT
        INTO atendimentos 
            (id_atividade, tipo_atendimento, observacoes, id_mentor_responsavel) VALUES (?,?,?,?),
        [id_atividade, tipo_atendimento, observacoes, id_mentor_responsavel]`
    );

    res.json({ message: "atendimento vinculado criada" });
});

export default router;
