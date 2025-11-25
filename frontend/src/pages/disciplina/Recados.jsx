// src/pages/disciplina/Recados.jsx
import { useEffect, useState } from "react";
import { getUserId } from "../../auth/session";

import "../../styles/Recados.css"

export default function Recados() {
  const userId = getUserId();
  const [disciplinas, setDisciplinas] = useState([]);
  const [todasDisciplinas, setTodasDisciplinas] = useState([]);
  const [recados, setRecados] = useState([]);

  useEffect(() => {
    if (!userId) return;
    carregarDisciplinas();
    carregarTodasDisciplinas();
    carregarRecados();
  }, [userId]);

  function carregarDisciplinas() {
    fetch(`http://localhost:3000/api/discentes/${userId}/disciplinas`)
      .then(res => res.json())
      .then(setDisciplinas)
      .catch(err => console.error(err));
  }

  function carregarTodasDisciplinas() {
    fetch(`http://localhost:3000/api/disciplinas`)
      .then(res => res.json())
      .then(setTodasDisciplinas)
      .catch(err => console.error(err));
  }

  function carregarRecados() {
    fetch(`http://localhost:3000/api/discentes/${userId}/recados`)
      .then(res => res.json())
      .then(setRecados)
      .catch(err => console.error(err));
  }

  function adicionarDisciplina(idDisciplina) {
    fetch(`http://localhost:3000/api/discentes/${userId}/disciplinas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_disciplina: idDisciplina }),
    }).then(() => {
      carregarDisciplinas();
      carregarRecados();
    });
  }

  function removerDisciplina(idDisciplina) {
    fetch(`http://localhost:3000/api/discentes/${userId}/disciplinas/${idDisciplina}`, {
      method: "DELETE",
    }).then(() => {
      carregarDisciplinas();
      carregarRecados();
    });
  }

  if (!userId) {
    return <p>Você precisa estar logado para ver os recados.</p>;
  }

  return (
        <div className="recados">
    <div className="recados__section">
        <h2>Minhas Disciplinas</h2>
        <ul className="recados__list">
        {disciplinas.map(d => (
            <li key={d.id_disciplina} className="recados__item">
            {d.nome} - {d.professor}{" "}
            <button className="recados__button" onClick={() => removerDisciplina(d.id_disciplina)}>
                Remover
            </button>
            </li>
        ))}
        </ul>
    </div>

    <div className="recados__section">
        <h3>Adicionar Disciplina</h3>
        <ul className="recados__list">
        {todasDisciplinas
            .filter(d => !disciplinas.find(x => x.id_disciplina === d.id_disciplina))
            .map(d => (
            <li key={d.id_disciplina} className="recados__item">
                {d.nome} - {d.professor}{" "}
                <button className="recados__button" onClick={() => adicionarDisciplina(d.id_disciplina)}>
                Adicionar
                </button>
            </li>
            ))}
        </ul>
    </div>

    <div className="recados__section">
        <h2>Recados</h2>
        {recados.length === 0 ? (
        <p className="recados__empty">Não há recados no momento.</p>
        ) : (
        <ul className="recados__list">
            {recados.map(r => (
            <li key={r.id_recado} className="recados__item">
                <strong>{r.tipo_recado}</strong>: {r.descricao}{" "}
                {r.data && (
                  <>
                    - Data: {new Date(r.data).toLocaleDateString("pt-BR")}{" "}
                    às {new Date(r.data).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </>
                )}
                {r.link_material && (
                <a className="recados__link" href={r.link_material} target="_blank" rel="noreferrer">
                    Material
                </a>
                )}
            </li>
            ))}
        </ul>
        )}
    </div>
    </div>
  );
}
