import { useState } from "react";
import axios from "axios";

export default function Registro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/register", { nome, email, senha });
      setMensagem(res.data.message);
      // Aqui você pode redirecionar para login, por exemplo
    } catch (err) {
      setMensagem(err.response?.data?.message || "Erro ao conectar");
    }
  };

  return (
    <div className="registro-container">
      <h1>Registro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>Email UNESP:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />

        <button type="submit">Registrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
