import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";

const router = express.Router();

// CADASTRO
router.post("/register", async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  if (!nome || !email || !senha)
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });

  try {
    const hash = await bcrypt.hash(senha, 10);

    await db.query("CALL sp_registrar_discente(?, ?, ?)", [
      nome,
      email,
      hash
    ]);

    res.json({ message: "Cadastro realizado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, senha, tipo } = req.body;

  if (!email || !senha || !tipo)
    return res.status(400).json({ message: "Email e senha são obrigatórios" });

  try {
    let rows = [];

    if (tipo === "mentor") {
      [rows] = await db.query("CALL sp_login_mentor(?)", [email]);
    } else {
      [rows] = await db.query("CALL sp_login_discente(?)", [email]);
    }

    const userRows = rows[0]; // MySQL retorna dentro do índice 0

    if (userRows.length === 0)
      return res.status(400).json({ message: "Usuário não encontrado" });

    const user = userRows[0];

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida)
      return res.status(400).json({ message: "Senha incorreta" });

    res.json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id_mentor || user.id_discente,
        nome: user.nome,
        email: user.email,
        matricula: user.matricula,
        periodo: user.periodo
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao realizar login" });
  }
});

export default router;
