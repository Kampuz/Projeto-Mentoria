import express from "express";
import db from "../db.js";

const router = express.Router();

// GET perfil completo do usuário usando procedure
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Executa a procedure
        const [resultSets] = await db.query("CALL sp_buscar_perfil(?)", [id]);

        // MySQL retorna resultados em arrays encadeados:
        const discenteRows = resultSets[0];       // Primeiro SELECT
        const mentorRows = resultSets[1];         // Segundo SELECT

        if (!discenteRows.length)
            return res.status(404).json({ mensagem: "Usuário não encontrado" });

        const usuario = discenteRows[0];
        const mentorInfo = mentorRows.length ? mentorRows[0] : null;

        res.json({ usuario, mentorInfo });

    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar perfil" });
    }
});

export default router;
