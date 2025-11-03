import { useState } from "react";
import "../styles/Perfil.css";

export default function Perfil() {
  // Simulando dados do usuário
  const [nome, setNome] = useState("Miguel Campos");
  const [email, setEmail] = useState("miguel@unesp.br");
  const [curso, setCurso] = useState("Ciência da Computação");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Perfil atualizado:\nNome: ${nome}\nEmail: ${email}\nCurso: ${curso}`);
  };

  return (
    <div className="perfil-container">
      <h1>Meu Perfil</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </label>
        <label>
          Curso:
          <input
            type="text"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
          />
        </label>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
