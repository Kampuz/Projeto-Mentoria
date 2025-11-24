import express from "express";
import db from "../db.js";

const router = express.Router();

// GET perfil do usuário
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar dados do discente
        const [discenteRows] = await db.query(
            "SELECT id_discente, nome, email, periodo, matricula FROM discentes WHERE id_discente = ?",
            [id]
        );

        if (!discenteRows.length) return res.status(404).json({ mensagem: "Usuário não encontrado" });

        const usuario = discenteRows[0];

        // Se for mentor, buscar dados de mentor
        let mentorInfo = null;
        if (usuario.eh_mentor) {
            const [mentorRows] = await db.query(
                "SELECT id_mentor, area_atuacao, bio FROM mentores WHERE id_mentor = ?",
                [id]
            );
            if (mentorRows.length) mentorInfo = mentorRows[0];
        }

        res.json({ usuario, mentorInfo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar perfil" });
    }
});

export default router;
