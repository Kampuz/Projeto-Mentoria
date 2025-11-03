import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js"; // conexão MySQL
const router = express.Router();

// login ou cadastro automático
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email.endsWith("@unesp.br"))
    return res.status(400).json({ message: "Apenas emails @unesp.br são permitidos" });

  db.query("SELECT * FROM alunos WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Erro no servidor" });

    if (results.length > 0) {
      // Login
      const aluno = results[0];
      const senhaCorreta = await bcrypt.compare(senha, aluno.senha);
      if (!senhaCorreta) return res.status(401).json({ message: "Senha incorreta" });
      return res.json({ message: "Login bem-sucedido", aluno });
    } else {
      // Cadastro
      const hash = await bcrypt.hash(senha, 10);
      db.query("INSERT INTO alunos (email, senha) VALUES (?, ?)", [email, hash], (err2) => {
        if (err2) return res.status(500).json({ message: "Erro ao criar usuário" });
        return res.json({ message: "Usuário criado e logado" });
      });
    }
  });
});

export default router;
