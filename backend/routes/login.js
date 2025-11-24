import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js"; // sua conexão MySQL

const router = express.Router();

// Cadastro de usuário
router.post("/register", async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  if (!nome || !email || !senha ) return res.status(400).json({ message: "Todos os campos são obrigatórios" });

  try {
    const hash = await bcrypt.hash(senha, 10); // hash da senha

    await db.query("INSERT INTO discentes (nome, email, senha) VALUES (?, ?, ?)", [nome, email, hash]);

    res.json({ message: "Cadastro realizado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, senha, tipo } = req.body;
  if (!email || !senha || !tipo) return res.status(400).json({ message: "Email e senha são obrigatórios" });

  try {

    let rows = [];
    // Primeiro tenta buscar no mentores
    if(tipo === "mentor") {
        [rows] = await db.query("SELECT * FROM mentores WHERE email = ?", [email]);
    } else {
      // Tenta buscar no discentes
      [rows] = await db.query("SELECT * FROM discentes WHERE email = ?", [email]);
    }

    if (rows.length === 0) return res.status(400).json({ message: "Usuário não encontrado" });

    const user = rows[0];

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) return res.status(400).json({ message: "Senha incorreta" });

    // Retorna usuário
    res.json({
      message: "Login realizado com sucesso!",
      user: { id: user.id_mentor || user.id_discente, nome: user.nome, tipo }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao realizar login" });
  }
});

export default router;
