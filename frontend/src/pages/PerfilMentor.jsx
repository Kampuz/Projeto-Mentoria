import { useState } from "react";
import "../styles/PerfilMentor.css";

export default function PerfilMentor() {
  // Simulação de dados do mentor logado
  const [nome, setNome] = useState("Ana Souza");
  const [emailContato, setEmailContato] = useState("ana.souza@unesp.br");
  const [horarios, setHorarios] = useState("Seg e Qua - 14h às 16h, Sex - 10h às 12h");
  const [local, setLocal] = useState("Lab 10");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Perfil de mentor atualizado:\nNome: ${nome}\nEmail: ${emailContato}\nHorários: ${horarios}\nLocal: ${local}`
    );
  };

  return (
    <div className="perfil-container">
      <h1>Meu Perfil de Mentor</h1>
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
            required
          />
        </label>

        <label>
          Horários Disponíveis:
          <textarea
            value={horarios}
            onChange={(e) => setHorarios(e.target.value)}
            placeholder="Ex: Seg e Qua - 14h às 16h"
          />
        </label>

        <label>
          Local de Atendimento:
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Ex: Lab 10"
          />
        </label>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
