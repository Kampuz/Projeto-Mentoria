import express from "express";
import db from "../db.js"; 

const router = express.Router();

// Atualizar recado
router.put("/:id_evento", async (req, res) => {
    const { tipo_evento, descricao, data_entrega, horario_prova, link_material } = req.body;
    await db.query(
        "UPDATE disciplina_recados SET tipo_evento=?, descricao=?, data_entrega=?, horario_prova=?, link_material=? WHERE id_evento=?",
        [tipo_evento, descricao, data_entrega || null, horario_prova || null, link_material || null, req.params.id]
    );
    res.json({ message: "Recado atualizado com sucesso!" });
});

// Remover recado
router.delete("/:id_evento", async (req, res) => {
    await db.query("DELETE FROM disciplina_recados WHERE id_evento=?", [req.params.id]);
    res.json({ message: "Recado removido com sucesso!" });
});

export default router;
