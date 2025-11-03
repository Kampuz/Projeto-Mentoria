import { useState } from "react";
import "../styles/PerfilMentor.css";

export default function PerfilAluno() {
  // Simulação de dados do mentor logado
  const [nome, setNome] = useState("Ana Souza");
  const [emailContato, setEmailContato] = useState("ana.souza@unesp.br");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Perfil de mentor atualizado:\nNome: ${nome}\nEmail: ${emailContato}`
    );
  };

  return (
    <div className="perfil-container">
      <h1>Perfil de Aluno</h1>
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
          Email de Contato:
          <input
            type="email"
            value={emailContato}
            onChange={(e) => setEmailContato(e.target.value)}
            pattern=".+@unesp\.br"
            title="Somente emails @unesp.br são permitidos"
            disabled
          />
        </label>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
