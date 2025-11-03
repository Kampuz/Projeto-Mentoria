import { useEffect, useState } from "react";
import "../styles/Perfil.css";

export default function PerfilMentor({ mentorId }) {
  // Simulação de dados do mentor logado
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/mentores`)
      .then((res) => res.json())
      .then((data) => {
        const mentor = data.find((m) => m.id === mentorId);
        if (mentor) {
          setNome(mentor.nome);
          setEmail(mentor.email);
          setHorario(mentor.horario_disponivel);
          setLocal(mentor.local);
        }
      });
  }, [mentorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/mentores/${mentorId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        nome,
        email,
        horario_disponivel: horario,
        local,
      }),
    });
    alert("Perfil atualizado!");
  };

  return (
    <div className="perfil-container">
      <h1>Perfil de Mentor</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            value={email}
            disabled
          />
        </label>

        <label>
          Horários Disponíveis:
          <input
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            placeholder="Ex: Seg e Qua - 14h às 16h"
          />
        </label>

        <label>
          Local:
          <input
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
