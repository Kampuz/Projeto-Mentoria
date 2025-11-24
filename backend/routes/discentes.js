import express from "express"
import db from "../db.js"

const router = express.Router();

router.get("/", async (req, res) => {
    const [rows] = await db.query(`
        SELECT
            d.*,
            CASE
                WHEN dm.id_mentor IS NOT NULL THEN 1
                ELSE 0
            END AS e_mentor
        FROM discentes d
        LEFT JOIN discentes_mentores dm
            ON dm.id_mentor = d.id_discente
        `);

    res.json(rows);
});

router.get("/:id", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM discentes WHERE id_discente = ?", [req.params.id]);

    if (rows.length === 0) return res.status(404).json({ mensagem: "Discente não encontrado"});
    res.json(rows[0]);
})

router.post("/", async (req, res) => {
    const { nome, email, matricula, periodo } = req.body;
    
    const [result] = await db.query(
        "INSERT INTO discentes (nome, email, matricula, periodo) VALUES (?, ?, ?, ?)",
        [nome, email, matricula, periodo]
    );

    res.json({ mensagem: "Discente criado", id: result.insertId});
});

router.put("/:id", async (req, res) => {
    const { nome, email, matricula, periodo } = req.body;

    await db.query(
        "UPDATE discentes SET nome=?, email=?, matricula=?, periodo=? WHERE id_discente=?",
        [nome, email, matricula, periodo, req.params.id]
    );

    res.json({ mensagem: "Discente atualizado"});
});

router.post("/:id/promover", async (req, res) => {
    const id = req.params.id;
    
    const [rows] = await db.query(
        "SELECT * FROM discentes_mentores WHERE id_mentor=?",
        [id]
    );

    if (rows.length > 0) {
        return res.json({ mensagem: "Este discente já é mentor." });
    }

    await db.query(
        "INSERT INTO discentes_mentores (id_mentor, area_atuacao, bio, disponibilidade) VALUES (?, '', '', '')",
        [id]
    );

    res.json({ mensagem: "Discente promovido a mentor" });
});

router.delete("/:id/desvincular", async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            "DELETE FROM discentes_mentores WHERE id_mentor = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Este discente não é mentor."
            });
        }

        res.json({ mensagem: "Discente deixou de ser mentor"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao desvincular mentor" });
    }
});

// DELETE /api/discentes/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM discentes WHERE id_discente = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Discente não encontrado" });
    }
    res.json({ message: "Discente removido com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao deletar discente" });
  }
});

export default router;