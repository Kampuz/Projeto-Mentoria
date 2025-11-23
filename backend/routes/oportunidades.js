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

router.post("/:id/inscrever", async (req, res) => {
    try {
        const { id } = req.params;
        const { id_discente } = req.body;

        await db.query(`
            INSERT INTO oportunidades_inscritos (id_oportunidade, id_discente, data_inscricao)
            VALUES (?, ?, CURDATE())
        `, [id, id_discente]);

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
