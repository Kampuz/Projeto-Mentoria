import express from "express";
import db from "../db.js"; 

const router = express.Router();

// Atualizar recado
router.put("/:id_recado", async (req, res) => {
    const { tipo_evento, descricao, data, horario, link_material } = req.body;
    await db.query(
        "UPDATE disciplina_recados SET tipo_evento=?, descricao=?, data=?, horario=?, link_material=? WHERE id_recado=?",
        [tipo_evento, descricao, data, horario, link_material, req.params.id_recado]
    );
    res.json({ message: "Recado atualizado com sucesso!" });
});

// Remover recado
router.delete("/:id_recado", async (req, res) => {
    await db.query("DELETE FROM disciplina_recados WHERE id_recado=?", [req.params.id_recado]);
    res.json({ message: "Recado removido com sucesso!" });
});

export default router;
