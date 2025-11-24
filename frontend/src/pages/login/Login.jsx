import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/Login.css"


export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("discente"); // padrão: discente
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", { email, senha, tipo });
      setMensagem(res.data.message);

      // Salvar usuário no localStorage (opcional)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirecionar para a página correta
      if (res.data.user.tipo === "mentor") {
        navigate("/mentor");
      } else {
        navigate("/discente");
      }
    } catch (err) {
      setMensagem(err.response?.data?.message || "Erro ao conectar");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Tipo de usuário:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="discente">Discente</option>
          <option value="mentor">Mentor</option>
        </select>

        <label>Email UNESP:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />

        <button type="submit">Entrar</button>
      </form>

      <Link to={"/registrar"}>REGISTRAR</Link>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
