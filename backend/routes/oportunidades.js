import express from "express";
import db from "../db.js"; 

const router = express.Router();

// LISTAR
router.get("/", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM oportunidades");
    res.json(rows);
});

// ADICIONAR
router.post("/", async (req, res) => {
    const { tipo, titulo, descricao, requisitos, data_publicacao, data_limite, link } = req.body;

    await db.query(
        "INSERT INTO oportunidades (tipo, titulo, descricao, requisitos, data_publicacao, data_limite, link) VALUES (?,?,?,?,?,?,?)",
        [tipo, titulo, descricao, requisitos, data_publicacao, data_limite, link]
    );

    res.json({ message: "Oportunidade criada" });
});

// EDITAR
router.put("/:id", async (req, res) => {
    const { tipo, titulo, descricao, requisitos, data_publicacao, data_limite, link } = req.body;

    await db.query(
        `UPDATE oportunidades 
         SET tipo=?, titulo=?, descricao=?, requisitos=?, data_publicacao=?, data_limite=?, link=? 
         WHERE id_oportunidade=?`,
        [tipo, titulo, descricao, requisitos, data_publicacao, data_limite, link, req.params.id]
    );

    res.json({ message: "Atualizado com sucesso" });
});

// REMOVER
router.delete("/:id", async (req, res) => {
    await db.query("DELETE FROM oportunidades WHERE id_oportunidade=?", [req.params.id]);
    res.json({ message: "Removido com sucesso" });
});

export default router;
