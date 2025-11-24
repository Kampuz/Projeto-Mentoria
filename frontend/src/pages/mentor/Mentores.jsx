import { useEffect, useState } from "react";
import "../../styles/Mentores.css";

export default function Mentores() {
  const [mentores, setMentores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/mentores")
      .then((res) => res.json())
      .then((data) => {
        setMentores(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar mentores:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando mentores...</p>;
  if (mentores.length === 0) return <p>Nenhum mentor disponível no momento.</p>;

  return (
    <div className="mentores">
      <h2>Lista de Mentores</h2>
      <ul className="mentores__list">
        {mentores.map((m) => (
            <li key={m.id_mentor} className="mentores__item">
            <h3>{m.nome_discente}</h3>
            <p><strong>Área:</strong> {m.area_atuacao}</p>
            <p><strong>Email:</strong> {m.email_discente}</p>
            {m.disponibilidade && <p><strong>Disponibilidade:</strong> {m.disponibilidade}</p>}
            {m.bio && <p className="mentores__bio">{m.bio}</p>}
            </li>
        ))}
        </ul>
    </div>
  );
}
