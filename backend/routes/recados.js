import express from "express";
import db from "../db.js";

const router = express.Router();

// Atualizar recado via procedure
router.put("/:id_recado", async (req, res) => {
    const { id_recado } = req.params;
    const { tipo_recado, descricao, data, link_material } = req.body;

    await db.query(
        "CALL sp_atualizar_recado(?, ?, ?, ?, ?)",
        [id_recado, tipo_recado, descricao, data, link_material]
    );

    res.json({ message: "Recado atualizado com sucesso!" });
});

// Remover recado via procedure
router.delete("/:id_recado", async (req, res) => {
    const { id_recado } = req.params;

    await db.query("CALL sp_remover_recado(?)", [id_recado]);

    res.json({ message: "Recado removido com sucesso!" });
});

export default router;
