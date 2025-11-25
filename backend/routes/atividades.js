import express from "express";
import db from "../db.js";

const router = express.Router();

// LISTAR
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("CALL sp_listar_atividades()");
        res.json(rows[0]); // CALL retorna arrays aninhados
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao listar atividades" });
    }
});

// ADICIONAR
router.post("/", async (req, res) => {
    const { tipo, titulo, descricao, data, local } = req.body;

    try {
        await db.query("CALL sp_criar_atividade(?, ?, ?, ?, ?)", [
            tipo, titulo, descricao, data, local
        ]);

        res.json({ message: "Atividade criada" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao criar atividade" });
    }
});

// INSCREVER
router.post("/:id/inscrever", async (req, res) => {
    try {
        const { id } = req.params;
        const { id_discente } = req.body;

        await db.query("CALL sp_inscrever_discente(?, ?)", [
            id,
            id_discente
        ]);

        res.json({ mensagem: "Inscrição realizada com sucesso!" });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ mensagem: "Você já está inscrito nessa atividade." });
        }

        console.error(err);
        res.status(500).json({ erro: "Erro ao realizar inscrição" });
    }
});

// PARTICIPAÇÃO
router.post("/:id/participacao", async (req, res) => {
    try {
        const { id } = req.params;
        const { id_discente, papel } = req.body;

        await db.query("CALL sp_confirmar_participacao(?, ?, ?)", [
            id, id_discente, papel
        ]);

        res.json({ mensagem: "Participação confirmada!" });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ mensagem: "Discente já foi marcado como participante." });
        }

        console.error(err);
        res.status(500).json({ erro: "Erro ao marcar participação" });
    }
});

// EDITAR
router.put("/:id", async (req, res) => {
    const { tipo, titulo, descricao, data, local } = req.body;

    try {
        await db.query("CALL sp_atualizar_atividade(?, ?, ?, ?, ?, ?)", [
            req.params.id, tipo, titulo, descricao, data, local
        ]);

        res.json({ message: "Atualizado com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao atualizar atividade" });
    }
});

// REMOVER
router.delete("/:id", async (req, res) => {
    try {
        await db.query("CALL sp_remover_atividade(?)", [req.params.id]);
        res.json({ message: "Removido com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao remover atividade" });
    }
});

export default router;
