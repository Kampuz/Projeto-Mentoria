import express from "express";
import db from "../db.js";

const router = express.Router();

// LISTAR
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("CALL sp_listar_oportunidades()");
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao listar oportunidades" });
    }
});

// CRIAR
router.post("/", async (req, res) => {
    const { tipo, titulo, descricao, requisitos, data_publicacao, data_limite, link } = req.body;

    try {
        await db.query("CALL sp_criar_oportunidade(?,?,?,?,?,?,?)", [
            tipo,
            titulo,
            descricao,
            requisitos,
            data_publicacao,
            data_limite,
            link,
        ]);

        res.json({ message: "Oportunidade criada" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao criar oportunidade" });
    }
});

// INSCREVER-SE
router.post("/:id/inscrever", async (req, res) => {
    try {
        const { id } = req.params;
        const { id_discente } = req.body;

        await db.query("CALL sp_inscrever_oportunidade(?,?)", [
            id,
            id_discente
        ]);

        res.json({ mensagem: "Inscrição realizada com sucesso!" });

    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ mensagem: "Você já está inscrito nessa oportunidade." });
        }
        
        res.status(500).json({ erro: "Erro ao realizar inscrição" });
    }
});

// EDITAR
router.put("/:id", async (req, res) => {
    const { tipo, titulo, descricao, requisitos, data_publicacao, data_limite, link } = req.body;

    try {
        await db.query("CALL sp_atualizar_oportunidade(?,?,?,?,?,?,?,?)", [
            req.params.id,
            tipo,
            titulo,
            descricao,
            requisitos,
            data_publicacao,
            data_limite,
            link,
        ]);

        res.json({ message: "Atualizado com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar oportunidade" });
    }
});

// REMOVER
router.delete("/:id", async (req, res) => {
    try {
        await db.query("CALL sp_remover_oportunidade(?)", [req.params.id]);
        res.json({ message: "Removido com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao remover oportunidade" });
    }
});

export default router;
