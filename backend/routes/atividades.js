import express from "express";
import db from "../db.js"; 

const router = express.Router();

// LISTAR
router.get("/", async (req, res) => {
    const [rows] = await db.query(`
        SELECT 
            a.id_atividade,
            a.titulo AS atividade_titulo,
            a.descricao AS atividade_descricao,
            a.data AS atividade_data,
            a.local AS atividade_local,
            at.id_atendimento,
            at.tipo_atendimento,
            at.observacoes,
            at.id_mentor_responsavel,
            dm.nome AS mentor_nome
        FROM atendimentos at
        JOIN atividades a ON a.id_atividade = at.id_atividade
        LEFT JOIN discentes dm ON dm.id_discente = at.id_mentor_responsavel
        ORDER BY a.data
    `);
    res.json(rows);
});

// ADICIONAR
router.post("/", async (req, res) => {
    const { tipo, titulo, descricao, data, local } = req.body;

    await db.query(
        "INSERT INTO atividades (tipo, titulo, descricao, data, local) VALUES (?,?,?,?,?)",
        [tipo, titulo, descricao, data, local]
    );

    res.json({ message: "Atividade criada" });
});

router.post("/:id/inscrever", async (req, res) => {
    try {
        const { id } = req.params;
        const { id_discente } = req.body;

        await db.query(`
            INSERT INTO atividades_inscritos (id_atividade, id_discente, data_inscricao)
            VALUES (?, ?, CURDATE())
        `, [id, id_discente]);

        res.json({ mensagem: "Inscrição realizada com sucesso!" });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ mensagem: "Você já está inscrito nessa atividade." });
        }
        
        res.status(500).json({ erro: "Erro ao realizar inscrição" });
    }
});

router.post("/:id/participacao", async (req, res) => {
    try {
        const { id } = req.params;
        const { id_discente, papel } = req.body;

        await db.query(`
            INSERT INTO atividade_participantes (id_atividade, id_discente, papel)
            VALUES (?, ?, ?)
        `, [id, id_discente, papel]);

        res.json({ mensagem: "Participação confirmada!" });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ mensagem: "Discente já foi marcado como participante." });
        }
        
        res.status(500).json({ erro: "Erro ao marcar participação" });
    }
});

// EDITAR
router.put("/:id", async (req, res) => {
    const { tipo, titulo, descricao, data, local } = req.body;

    await db.query(
        `UPDATE atividades 
         SET tipo=?, titulo=?, descricao=?, data=?, local=? 
         WHERE id_atividade=?`,
        [tipo, titulo, descricao, data, local, req.params.id]
    );

    res.json({ message: "Atualizado com sucesso" });
});

// REMOVER
router.delete("/:id", async (req, res) => {
    await db.query("DELETE FROM atividades WHERE id_atividade=?", [req.params.id]);
    res.json({ message: "Removido com sucesso" });
});

export default router;
