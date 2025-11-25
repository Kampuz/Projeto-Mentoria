import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/Perfil.css"

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [participacoes, setParticipacoes] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);

      carregarParticipacoes(storedUser.id);
      carregarDisciplinas(storedUser.id);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  function carregarParticipacoes(idDiscente) {
    fetch(`http://localhost:3000/api/discentes/${idDiscente}/participacoes`)
      .then(res => res.json())
      .then(setParticipacoes)
      .catch(err => console.error(err));
  }

  function carregarDisciplinas(idDiscente) {
    fetch(`http://localhost:3000/api/discentes/${idDiscente}/disciplinas`)
      .then(res => res.json())
      .then(setDisciplinas)
      .catch(err => console.error(err));
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="perfil-container">
      <h1>Perfil do Usuário</h1>

      <div className="perfil-card">
        <p><strong>Nome:</strong> {user.nome}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Tipo:</strong> {user.tipo}</p>
        {user.matricula && <p><strong>Matrícula:</strong> {user.matricula}</p>}
        {user.periodo && <p><strong>Período:</strong> {user.periodo}</p>}
      </div>

      <h2>Disciplinas Seguidas</h2>

      {disciplinas.length === 0 ? (
        <p>Você não segue nenhuma disciplina.</p>
      ) : (
        <ul className="disciplinas-list">
          {disciplinas.map(d => (
            <li key={d.id_disciplina} className="disciplina-item">
              <strong>{d.nome}</strong> — {d.professor}
            </li>
          ))}
        </ul>
      )}

      <h2>Participações</h2>

      {participacoes.length === 0 ? (
        <p>Você ainda não participou de nada.</p>
      ) : (
        <ul className="participacoes-list">
          {participacoes.map(p => (
            <li key={p.id} className="participacao-item">
              <p><strong>Tipo:</strong> {p.tipo}</p>
              <p><strong>Nome:</strong> {p.nome}</p>
              {p.data && (
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(p.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      <button className="logout-button" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
