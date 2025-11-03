import { useEffect, useState } from "react";
import "../styles/Mentoria.css";

export default function Mentores() {
  // Simulação de dados vindos do backend
  const [mentores, setMentores] = useState([]);

  useEffect(() => {
    fetch("https://localhost:3000/api/mentores")
      .then((res) => res.json())
      .then((data) => setMentores(data))
      .catch((err) => console.error(err));
  })

  return (
    <div className="mentoria-container">
      <h1>Mentores Disponíveis</h1>
      <div className="mentoria-lista">
        {mentores.length === 0 ? (
          <p>Carregando mentores...</p>
        ) : (
          mentores.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <h2>{mentor.nome}</h2>
              <p><strong>Email:</strong> {mentor.email}</p>
              <p><strong>Horários:</strong> {mentor.horario_disponivel}</p>
              <p><strong>Local:</strong> {mentor.local}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
